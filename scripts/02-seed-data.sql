-- Insert service categories
INSERT INTO service_categories (name, description, icon) VALUES
('HVAC', 'Heating, Ventilation, and Air Conditioning services', 'thermometer'),
('Plumbing', 'Water systems, pipes, and drainage maintenance', 'droplet'),
('Electrical', 'Electrical systems and appliance maintenance', 'zap'),
('IoT Monitoring', 'Smart device installation and monitoring', 'wifi'),
('Preventive Maintenance', 'Regular maintenance to prevent issues', 'shield-check'),
('Emergency Repair', '24/7 emergency maintenance services', 'alert-circle');

-- Insert sample services
INSERT INTO services (category_id, name, description, price, duration_minutes) VALUES
((SELECT id FROM service_categories WHERE name = 'HVAC'), 'AC System Inspection', 'Complete air conditioning system inspection and cleaning', 150.00, 120),
((SELECT id FROM service_categories WHERE name = 'HVAC'), 'Heating System Maintenance', 'Annual heating system maintenance and tune-up', 200.00, 180),
((SELECT id FROM service_categories WHERE name = 'Plumbing'), 'Pipe Leak Detection', 'Advanced leak detection using IoT sensors', 100.00, 90),
((SELECT id FROM service_categories WHERE name = 'Plumbing'), 'Water Heater Service', 'Water heater inspection and maintenance', 120.00, 120),
((SELECT id FROM service_categories WHERE name = 'Electrical'), 'Electrical Safety Inspection', 'Complete electrical system safety check', 180.00, 150),
((SELECT id FROM service_categories WHERE name = 'IoT Monitoring'), 'Smart Sensor Installation', 'Installation of IoT monitoring sensors', 300.00, 240),
((SELECT id FROM service_categories WHERE name = 'Preventive Maintenance'), 'Monthly Maintenance Package', 'Comprehensive monthly maintenance service', 250.00, 300),
((SELECT id FROM service_categories WHERE name = 'Emergency Repair'), '24/7 Emergency Service', 'Emergency maintenance and repair service', 400.00, 180);
