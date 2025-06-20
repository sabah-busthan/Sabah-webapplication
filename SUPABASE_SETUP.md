# Supabase Setup Guide

This project has been migrated from Firebase to Supabase. Follow these steps to set up your Supabase database.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `sabah-webapp` (or your preferred name)
   - Database Password: Create a strong password
   - Region: Choose the closest region to your users
5. Click "Create new project"

## 2. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **Anon public key** (starts with `eyJ...`)

## 3. Update Configuration

1. Open `supabase-config.js`
2. Replace the placeholder values with your actual credentials:

```javascript
const supabaseConfig = {
    url: 'YOUR_SUPABASE_URL',        // Replace with your Project URL
    anonKey: 'YOUR_SUPABASE_ANON_KEY' // Replace with your Anon public key
};
```

## 4. Create Database Tables

In your Supabase dashboard, go to **SQL Editor** and run the following SQL commands:

### Programs Table
```sql
CREATE TABLE IF NOT EXISTS programs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    longDescription TEXT NOT NULL,
    image TEXT NOT NULL,
    date DATE NOT NULL,
    time TEXT NOT NULL,
    location TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'upcoming',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Publications Table
```sql
CREATE TABLE IF NOT EXISTS publications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    abstract TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    type TEXT NOT NULL,
    image TEXT NOT NULL,
    file_url TEXT,
    download_url TEXT,
    date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 5. Enable Row Level Security (RLS)

For this demo project, we'll disable RLS to allow public access. In production, you should implement proper authentication.

```sql
-- Disable RLS for demo purposes
ALTER TABLE programs DISABLE ROW LEVEL SECURITY;
ALTER TABLE publications DISABLE ROW LEVEL SECURITY;
```

## 6. Enable Real-time

1. Go to **Database** → **Replication**
2. Enable real-time for both tables:
   - `programs`
   - `publications`

## 7. Test Your Setup

1. Open your website in a browser
2. Check the browser console for any errors
3. Try adding a program or publication through the admin panel
4. Verify that real-time updates work

## 8. Optional: Add Sample Data

You can insert sample data using the SQL Editor:

```sql
-- Insert sample programs
INSERT INTO programs (title, category, description, longDescription, image, date, time, location, status) VALUES
('Academic Excellence Workshop', 'academic', 'Comprehensive workshops and study groups designed to enhance academic performance and foster intellectual growth among students.', 'Join us for an intensive academic workshop featuring expert speakers, interactive sessions, and study techniques that will help you excel in your studies.', 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&h=300&fit=crop', '2024-03-15', '10:00 AM - 2:00 PM', 'Main Auditorium', 'upcoming'),
('Community Service Day', 'community', 'Volunteer programs and social initiatives that make a positive impact on our local community and beyond.', 'A day dedicated to giving back to our community. Participate in various volunteer activities including environmental cleanup, food drives, and educational outreach programs.', 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&h=300&fit=crop', '2024-03-20', '9:00 AM - 5:00 PM', 'Various Locations', 'upcoming');

-- Insert sample publications
INSERT INTO publications (title, category, description, abstract, content, author, type, image, date) VALUES
('Annual Report 2023', 'reports', 'Comprehensive overview of SABAH College Union activities and achievements for the year 2023.', 'This annual report highlights the significant milestones, programs, and community impact achieved by SABAH College Union throughout 2023.', 'The year 2023 marked a period of remarkable growth and achievement for SABAH College Union. We successfully organized over 50 events, engaged more than 1000 students, and established partnerships with 15 community organizations.', 'SABAH Executive Committee', 'Annual Report', 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&h=300&fit=crop', '2024-01-15'),
('Student Leadership Development', 'research', 'Research paper on effective student leadership development programs in higher education.', 'This research explores the impact of structured leadership development programs on student success and community engagement.', 'Our research demonstrates that students who participate in structured leadership development programs show significant improvements in communication skills, problem-solving abilities, and community engagement.', 'Dr. Sarah Johnson', 'Research Paper', 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&h=300&fit=crop', '2024-02-20');
```

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure your Supabase URL is correct
2. **Authentication Errors**: Check that your anon key is correct
3. **Real-time Not Working**: Ensure real-time is enabled for your tables
4. **Database Connection**: Verify your project is active and not paused

### Getting Help:

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Community](https://github.com/supabase/supabase/discussions)
- Check the browser console for detailed error messages

## Migration Notes

This migration maintains the same API interface as the original Firebase implementation, so all existing functionality should work seamlessly. The main changes are:

- Firebase Firestore → Supabase PostgreSQL
- Firebase Realtime Database → Supabase Real-time
- Firebase Authentication → Supabase Auth (not implemented in this demo)
- Firebase Storage → Supabase Storage (not implemented in this demo)

For production use, consider implementing:
- User authentication with Supabase Auth
- File uploads with Supabase Storage
- Row Level Security (RLS) policies
- Database backups and monitoring 