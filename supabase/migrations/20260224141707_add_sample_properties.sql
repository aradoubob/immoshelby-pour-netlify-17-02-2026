/*
  # Add sample properties for demonstration

  1. New Data
    - Inserts 6 sample properties with Romanian text
    - Properties include apartments and houses
    - Mix of sale and rent properties
    - Realistic prices and details
    - Using Pexels stock photos for images
*/

INSERT INTO properties (
  title_ro,
  description_ro,
  location_ro,
  price,
  type,
  category,
  surface,
  rooms,
  bathrooms,
  city,
  images,
  status,
  featured
) VALUES
(
  'Apartament modern în centrul Bucureștiului',
  'Apartament spațios cu 3 camere, complet renovat, cu vedere panoramică. Situat în zona centrală, aproape de metrou și toate facilitățile. Bucătărie echipată, baie modernă, balcon mare.',
  'Strada Victoriei 45, Sector 1, București',
  250000,
  'sale',
  'apartment',
  95,
  3,
  2,
  'București',
  '["https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800"]',
  'available',
  true
),
(
  'Casă de lux cu grădină în Cluj-Napoca',
  'Casă individuală cu design modern, 4 dormitoare, 3 băi, living spațios cu șemineu. Grădină mare cu gazon, loc de parcare pentru 2 mașini, sistem de alarmă.',
  'Strada Observatorului 12, Zorilor, Cluj-Napoca',
  450000,
  'sale',
  'house',
  220,
  5,
  3,
  'Cluj-Napoca',
  '["https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800"]',
  'available',
  true
),
(
  'Apartament cu 2 camere de închiriat',
  'Apartament confortabil, mobilat și utilat complet. Perfect pentru tineri profesioniști. Aproape de universitate și zona de business. Parcare disponibilă.',
  'Bulevardul Eroilor 23, Sector 5, București',
  800,
  'rent',
  'apartment',
  65,
  2,
  1,
  'București',
  '["https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800"]',
  'available',
  false
),
(
  'Vilă nouă la cheie în Brașov',
  'Vilă premium, construcție 2024, finisaje de top. 5 dormitoare, 4 băi, piscină interioară, saună, home cinema. Sistem smart home complet. Vedere la munte.',
  'Strada Poienii 8, Poiana Brașov',
  680000,
  'sale',
  'house',
  350,
  6,
  4,
  'Brașov',
  '["https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/2360673/pexels-photo-2360673.jpeg?auto=compress&cs=tinysrgb&w=800"]',
  'available',
  true
),
(
  'Apartament Studio de închiriat în Timișoara',
  'Studio modern, ideal pentru studenți sau persoane singure. Complet mobilat și utilat. Cartier liniștit, aproape de transport în comun.',
  'Strada Plopilor 15, Timișoara',
  450,
  'rent',
  'apartment',
  35,
  1,
  1,
  'Timișoara',
  '["https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800"]',
  'available',
  false
),
(
  'Penthouse exclusivist cu terasă panoramică',
  'Penthouse de lux la ultimul etaj, terasă de 80mp cu vedere 360°. Interior design premium, 4 camere, 3 băi, bucătărie italiană, sistem climatizare centrală.',
  'Bulevardul Aviatorilor 100, Sector 1, București',
  890000,
  'sale',
  'apartment',
  180,
  4,
  3,
  'București',
  '["https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800"]',
  'available',
  true
)
ON CONFLICT (id) DO NOTHING;
