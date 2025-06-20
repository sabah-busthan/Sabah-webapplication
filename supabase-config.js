// Supabase Configuration - Replacing Firebase
let supabaseService = null;

// Replace these with your actual Supabase config
const supabaseConfig = {
    url: 'https://adbwxdqhkvbwpqdrgtqp.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkYnd4ZHFoa3Zid3BxZHJndHFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNjQyODcsImV4cCI6MjA2NTg0MDI4N30.8H7QZl295Io7brg70-P-KyXAxLB9T0wTeTD5DXKmzd0'
};

// Initialize Supabase when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load Supabase script dynamically
    loadSupabaseScript();
});

function loadSupabaseScript() {
    // Load Supabase JavaScript client
    const supabaseScript = document.createElement('script');
    supabaseScript.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
    supabaseScript.onload = function() {
        // Initialize Supabase after script is loaded
        initializeSupabase();
    };
    document.head.appendChild(supabaseScript);
}

function initializeSupabase() {
    try {
        // Initialize Supabase client
        const supabase = window.supabase.createClient(supabaseConfig.url, supabaseConfig.anonKey);

        // Collections
        const PROGRAMS_TABLE = "programs";
        const PUBLICATIONS_TABLE = "publications";

        // Supabase Service (maintaining same API as Firebase for seamless migration)
        supabaseService = {
            // Programs Functions
            async getPrograms() {
                try {
                    const { data: programs, error } = await supabase
                        .from(PROGRAMS_TABLE)
                        .select('*')
                        .order('date', { ascending: false });
                    
                    if (error) {
                        console.error("Error getting programs:", error);
                        return [];
                    }
                    
                    // If no programs in database, return empty array
                    if (!programs || programs.length === 0) {
                        console.log('No programs in database');
                        return [];
                    }
                    
                    return programs;
                } catch (error) {
                    console.error("Error getting programs:", error);
                    return [];
                }
            },

            async addProgram(programData) {
                try {
                    console.log('Attempting to add program:', programData);
                    const { data, error } = await supabase
                        .from(PROGRAMS_TABLE)
                        .insert([{
                            ...programData,
                            created_at: new Date().toISOString(),
                            updated_at: new Date().toISOString()
                        }])
                        .select();
                    
                    if (error) {
                        console.error("Supabase error adding program:", error);
                        console.error("Error details:", {
                            message: error.message,
                            details: error.details,
                            hint: error.hint,
                            code: error.code
                        });
                        throw error;
                    }
                    
                    console.log('Program added to Supabase with ID:', data[0].id);
                    return data[0].id;
                } catch (error) {
                    console.error("Error adding program:", error);
                    throw error;
                }
            },

            async updateProgram(programId, programData) {
                try {
                    const { error } = await supabase
                        .from(PROGRAMS_TABLE)
                        .update({
                            ...programData,
                            updated_at: new Date().toISOString()
                        })
                        .eq('id', programId);
                    
                    if (error) {
                        console.error("Error updating program:", error);
                        throw error;
                    }
                    
                    console.log('Program updated in Supabase:', programId);
                } catch (error) {
                    console.error("Error updating program:", error);
                    throw error;
                }
            },

            async deleteProgram(programId) {
                try {
                    const { error } = await supabase
                        .from(PROGRAMS_TABLE)
                        .delete()
                        .eq('id', programId);
                    
                    if (error) {
                        console.error("Error deleting program:", error);
                        throw error;
                    }
                    
                    console.log('Program deleted from Supabase:', programId);
                } catch (error) {
                    console.error("Error deleting program:", error);
                    throw error;
                }
            },

            // Publications Functions
            async getPublications() {
                try {
                    const { data: publications, error } = await supabase
                        .from(PUBLICATIONS_TABLE)
                        .select('*')
                        .order('date', { ascending: false });
                    
                    if (error) {
                        console.error("Error getting publications:", error);
                        return [];
                    }
                    
                    // If no publications in database, return empty array
                    if (!publications || publications.length === 0) {
                        console.log('No publications in database');
                        return [];
                    }
                    
                    return publications;
                } catch (error) {
                    console.error("Error getting publications:", error);
                    return [];
                }
            },

            async addPublication(publicationData) {
                try {
                    console.log('Attempting to add publication:', publicationData);
                    const { data, error } = await supabase
                        .from(PUBLICATIONS_TABLE)
                        .insert([{
                            ...publicationData,
                            created_at: new Date().toISOString(),
                            updated_at: new Date().toISOString()
                        }])
                        .select();
                    
                    if (error) {
                        console.error("Supabase error adding publication:", error);
                        console.error("Error details:", {
                            message: error.message,
                            details: error.details,
                            hint: error.hint,
                            code: error.code
                        });
                        throw error;
                    }
                    
                    console.log('Publication added to Supabase with ID:', data[0].id);
                    return data[0].id;
                } catch (error) {
                    console.error("Error adding publication:", error);
                    throw error;
                }
            },

            async updatePublication(publicationId, publicationData) {
                try {
                    const { error } = await supabase
                        .from(PUBLICATIONS_TABLE)
                        .update({
                            ...publicationData,
                            updated_at: new Date().toISOString()
                        })
                        .eq('id', publicationId);
                    
                    if (error) {
                        console.error("Error updating publication:", error);
                        throw error;
                    }
                    
                    console.log('Publication updated in Supabase:', publicationId);
                } catch (error) {
                    console.error("Error updating publication:", error);
                    throw error;
                }
            },

            async deletePublication(publicationId) {
                try {
                    const { error } = await supabase
                        .from(PUBLICATIONS_TABLE)
                        .delete()
                        .eq('id', publicationId);
                    
                    if (error) {
                        console.error("Error deleting publication:", error);
                        throw error;
                    }
                    
                    console.log('Publication deleted from Supabase:', publicationId);
                } catch (error) {
                    console.error("Error deleting publication:", error);
                    throw error;
                }
            },

            // Manual refresh function
            async refreshData() {
                console.log('Manual refresh triggered');
                // This will be called by the UI to manually refresh data
                return {
                    programs: await this.getPrograms(),
                    publications: await this.getPublications()
                };
            },

            // Real-time subscriptions (Supabase real-time) with fallback to polling
            onProgramsChange(callback) {
                try {
                    // Try to use Supabase real-time
                    const subscription = supabase
                        .channel('programs_changes')
                        .on('postgres_changes', 
                            { event: '*', schema: 'public', table: PROGRAMS_TABLE },
                            (payload) => {
                                console.log('Programs change detected:', payload);
                                // Reload programs when changes occur
                                this.getPrograms().then(callback);
                            }
                        )
                        .subscribe();
                    
                    return subscription;
                } catch (error) {
                    console.warn('Real-time not available, using polling for programs:', error);
                    // Fallback to polling every 10 seconds
                    const pollInterval = setInterval(() => {
                        this.getPrograms().then(callback);
                    }, 10000);
                    
                    return {
                        unsubscribe: () => clearInterval(pollInterval)
                    };
                }
            },

            onPublicationsChange(callback) {
                try {
                    // Try to use Supabase real-time
                    const subscription = supabase
                        .channel('publications_changes')
                        .on('postgres_changes', 
                            { event: '*', schema: 'public', table: PUBLICATIONS_TABLE },
                            (payload) => {
                                console.log('Publications change detected:', payload);
                                // Reload publications when changes occur
                                this.getPublications().then(callback);
                            }
                        )
                        .subscribe();
                    
                    return subscription;
                } catch (error) {
                    console.warn('Real-time not available, using polling for publications:', error);
                    // Fallback to polling every 10 seconds
                    const pollInterval = setInterval(() => {
                        this.getPublications().then(callback);
                    }, 10000);
                    
                    return {
                        unsubscribe: () => clearInterval(pollInterval)
                    };
                }
            }
        };

        // Make service available globally
        window.supabaseService = supabaseService;
        window.firebaseService = supabaseService; // Keep Firebase service name for compatibility

        // Add diagnostic function
        window.diagnoseSupabase = async function() {
            console.log('=== Supabase Diagnostic ===');
            console.log('Config:', { url: supabaseConfig.url, anonKey: supabaseConfig.anonKey.substring(0, 20) + '...' });
            
            try {
                // Test connection
                const { data: testData, error: testError } = await supabase
                    .from('information_schema.tables')
                    .select('table_name')
                    .eq('table_schema', 'public')
                    .limit(1);
                
                if (testError) {
                    console.error('Connection test failed:', testError);
                    return false;
                }
                
                console.log('✅ Connection successful');
                
                // Check if programs table exists
                const { data: programsTable, error: programsError } = await supabase
                    .from('information_schema.tables')
                    .select('table_name')
                    .eq('table_schema', 'public')
                    .eq('table_name', PROGRAMS_TABLE);
                
                if (programsError) {
                    console.error('Error checking programs table:', programsError);
                } else if (programsTable.length === 0) {
                    console.error('❌ Programs table does not exist');
                    console.log('Please create the programs table using the SQL in SUPABASE_SETUP.md');
                } else {
                    console.log('✅ Programs table exists');
                }
                
                // Check if publications table exists
                const { data: publicationsTable, error: publicationsError } = await supabase
                    .from('information_schema.tables')
                    .select('table_name')
                    .eq('table_schema', 'public')
                    .eq('table_name', PUBLICATIONS_TABLE);
                
                if (publicationsError) {
                    console.error('Error checking publications table:', publicationsError);
                } else if (publicationsTable.length === 0) {
                    console.error('❌ Publications table does not exist');
                    console.log('Please create the publications table using the SQL in SUPABASE_SETUP.md');
                } else {
                    console.log('✅ Publications table exists');
                }
                
                return true;
            } catch (error) {
                console.error('Diagnostic failed:', error);
                return false;
            }
        };

        console.log('Supabase initialized successfully!');

        // Run diagnostic
        setTimeout(() => {
            window.diagnoseSupabase();
        }, 1000);

        // Notify that service is ready
        if (window.onFirebaseReady) {
            window.onFirebaseReady();
        }

    } catch (error) {
        console.error('Error initializing Supabase:', error);
        // Fallback to mock service if Supabase fails
        createMockService();
    }
}

// Fallback mock service (will be used if Supabase fails to load)
function createMockService() {
    console.warn('Supabase failed to load, using mock service');
    window.supabaseService = {
        async getPrograms() {
            return [];
        },
        async getPublications() {
            return [];
        },
        async addProgram() { return 'mock-id'; },
        async addPublication() { return 'mock-id'; },
        async updateProgram() {},
        async updatePublication() {},
        async deleteProgram() {},
        async deletePublication() {},
        async refreshData() {
            return {
                programs: [],
                publications: []
            };
        },
        onProgramsChange(callback) { 
            // Use polling instead of real-time for mock service
            const pollInterval = setInterval(() => {
                callback([]);
            }, 10000);
            
            return {
                unsubscribe: () => clearInterval(pollInterval)
            };
        },
        onPublicationsChange(callback) { 
            // Use polling instead of real-time for mock service
            const pollInterval = setInterval(() => {
                callback([]);
            }, 10000);
            
            return {
                unsubscribe: () => clearInterval(pollInterval)
            };
        }
    };
    
    // Also set as firebaseService for compatibility
    window.firebaseService = window.supabaseService;

    if (window.onFirebaseReady) {
        window.onFirebaseReady();
    }
}

// Fallback: If Supabase fails to load, create a mock service for development
setTimeout(() => {
    if (!window.supabaseService) {
        createMockService();
    }
}, 5000); // Wait 5 seconds for Supabase to load 