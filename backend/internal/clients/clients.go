package clients

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/nexus/nexus/internal/middleware"
)

func ListClients(db *sql.DB) http.HandlerFunc {
	return middleware.Auth(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		rows, err := db.Query("SELECT id, first_name, last_name, email, company, status, created_at FROM clients ORDER BY created_at DESC LIMIT 100")
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(`{"error":"database error"}`))
			return
		}
		defer rows.Close()

		var clients []map[string]interface{}
		for rows.Next() {
			var c struct {
				ID         string `json:"id"`
				FirstName  string `json:"first_name"`
				LastName   string `json:"last_name"`
				Email      string `json:"email"`
				Company    string `json:"company"`
				Status     string `json:"status"`
				CreatedAt  string `json:"created_at"`
			}
			rows.Scan(&c.ID, &c.FirstName, &c.LastName, &c.Email, &c.Company, &c.Status, &c.CreatedAt)
			clients = append(clients, map[string]interface{}{
				"id": c.ID, "first_name": c.FirstName, "last_name": c.LastName,
				"email": c.Email, "company": c.Company, "status": c.Status,
				"created_at": c.CreatedAt,
			})
		}
		json.NewEncoder(w).Encode(map[string]interface{}{"clients": clients, "count": len(clients)})
	})
}
