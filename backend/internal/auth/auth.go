package auth

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

func RegisterHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		var payload struct {
			Email           string `json:"email"`
			Password        string `json:"password"`
			FirstName       string `json:"first_name"`
			LastName        string `json:"last_name"`
			OrganizationID  string `json:"organization_id"`
		}
		if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte(`{"error":"invalid request body"}`))
			return
		}

		hash, err := bcrypt.GenerateFromPassword([]byte(payload.Password), bcrypt.DefaultCost)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(`{"error":"failed to hash password"}`))
			return
		}

		_, err = db.Exec(
			"INSERT INTO users (email, password_hash, first_name, last_name, role, status, organization_id) VALUES ($1, $2, $3, $4, 'client', 'pending', $5)",
			payload.Email, string(hash), payload.FirstName, payload.LastName, payload.OrganizationID,
		)
		if err != nil {
			w.WriteHeader(http.StatusConflict)
			w.Write([]byte(`{"error":"email already exists"}`))
			return
		}

		w.WriteHeader(http.StatusCreated)
		w.Write([]byte(`{"message":"user registered","email":"` + payload.Email + `"}`))
	}
}

func LoginHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		var payload struct {
			Email    string `json:"email"`
			Password string `json:"password"`
		}
		if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte(`{"error":"invalid request body"}`))
			return
		}

		var user struct {
			ID         string
			Email      string
			Hash       string
			Role       string
			Status     string
			FirstName  string
			LastName   string
		}
		err := db.QueryRow("SELECT id, email, password_hash, role, status, first_name, last_name FROM users WHERE email = $1", payload.Email).Scan(
			&user.ID, &user.Email, &user.Hash, &user.Role, &user.Status, &user.FirstName, &user.LastName,
		)
		if err == sql.ErrNoRows {
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte(`{"error":"invalid credentials"}`))
			return
		} else if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(`{"error":"database error"}`))
			return
		}

		if user.Status != "active" {
			w.WriteHeader(http.StatusForbidden)
			w.Write([]byte(`{"error":"account not active"}`))
			return
		}

		if err := bcrypt.CompareHashAndPassword([]byte(user.Hash), []byte(payload.Password)); err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte(`{"error":"invalid credentials"}`))
			return
		}

		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"sub":   user.ID,
			"email": user.Email,
			"role":  user.Role,
			"exp":   time.Now().Add(24 * time.Hour).Unix(),
		})

		secret := os.Getenv("JWT_SECRET")
		if secret == "" {
			secret = "nexus_default_secret_change_me"
		}

		tokenStr, err := token.SignedString([]byte(secret))
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(`{"error":"token generation failed"}`))
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"token": tokenStr,
			"user": map[string]string{
				"id":         user.ID,
				"email":      user.Email,
				"role":       user.Role,
				"first_name": user.FirstName,
				"last_name":  user.LastName,
			},
		})
	}
}
