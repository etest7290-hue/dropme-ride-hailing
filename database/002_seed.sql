-- Insert default pricing
INSERT INTO pricing (type, base_fare, price_per_km, waiting_charge_per_min, night_charge_percentage, minimum_fare, is_active)
VALUES 
  ('bike', 50, 15, 1, 25, 100),
  ('car', 100, 25, 2, 30, 200);

-- Create admin user (password: admin123)
INSERT INTO users (email, phone_number, password, first_name, last_name, role, is_email_verified, is_phone_verified, is_active)
VALUES 
  ('admin@dropme.com', '+923001234567', '$2b$10$YJONHdROC1YfCDTnA8Jh.e8Q8QZQZQZQZQZQZQZQ', 'Admin', 'User', 'admin', TRUE, TRUE, TRUE);
