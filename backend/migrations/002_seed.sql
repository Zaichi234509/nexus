-- Demo organization
INSERT INTO organizations (id, name, slug, email, phone, address) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Meridian Digital', 'meridian-digital', 'hello@meridian.digital', '+63 2 8123 4567', '123 Business Ave, Makati, Metro Manila');

-- Demo users (password: admin123, staff123, client123)
INSERT INTO users (id, email, password_hash, first_name, last_name, role, status, organization_id) VALUES
('b1c2d3e4-f5a6-7890-bcde-f12345678901', 'admin@nexus.local', '$2a$10$rO2O1Z8Yv1o8lXb5JH4z1.uK2X0p3kL7zN0vA9B8C5D6E7F8G9H0I1J', 'Elena', 'Reyes', 'admin', 'active', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'),
('c2d3e4f5-a6b7-8901-cdef-123456789012', 'staff@nexus.local', '$2a$10$rO2O1Z8Yv1o8lXb5JH4z1.uK2X0p3kL7zN0vA9B8C5D6E7F8G9H0I1J', 'Marcus', 'Tan', 'staff', 'active', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'),
('d3e4f5a6-b7c8-9012-defa-234567890123', 'client@nexus.local', '$2a$10$rO2O1Z8Yv1o8lXb5JH4z1.uK2X0p3kL7zN0vA9B8C5D6E7F8G9H0I1J', 'Sophia', 'Lim', 'client', 'active', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890');

-- Demo clients
INSERT INTO clients (id, organization_id, first_name, last_name, email, phone, company, position, status, assigned_staff_id) VALUES
('e4f5a6b7-c8d9-0123-efab-345678901234', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Andrei', 'Santos', 'andrei@santos.ph', '+63 917 555 0101', 'Santos Design', 'CEO', 'active', 'c2d3e4f5-a6b7-8901-cdef-123456789012'),
('f5a6b7c8-d9e0-1234-fabc-456789012345', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Camille', 'Dela Cruz', 'camille@delacruz.dev', '+63 918 777 0202', 'Dela Cruz Dev', 'CTO', 'prospect', 'c2d3e4f5-a6b7-8901-cdef-123456789012'),
('a6b7c8d9-e0f1-2345-abcd-567890123456', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Rafael', 'Mendoza', 'rafael@mendoza.co', '+63 919 888 0303', 'Mendoza Consulting', 'Managing Director', 'lead', NULL),
('b7c8d9e0-f1a2-3456-bcde-678901234567', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Isabella', 'Navarro', 'isabella@navarro.agency', '+63 920 999 0404', 'Navarro Agency', 'Founder', 'inactive', 'c2d3e4f5-a6b7-8901-cdef-123456789012');
