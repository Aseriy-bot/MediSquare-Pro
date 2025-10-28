/* ========= Enhanced Sidebar Toggle with Animations ========= */
        let isSidebarOpen = true;

        // Initialize sidebar state from localStorage
        function initSidebarState() {
            const savedState = localStorage.getItem('sidebarState');
            isSidebarOpen = savedState !== 'false';
            
            const sidebar = document.querySelector('.sidebar');
            const mainContent = document.querySelector('.main-content');
            const menuToggle = document.getElementById('menuToggle');
            
            if (!isSidebarOpen) {
                closeSidebar(sidebar, mainContent, menuToggle);
            } else {
                openSidebar(sidebar, mainContent, menuToggle);
            }
        }

        // Open sidebar with animation
        function openSidebar(sidebar, mainContent, menuToggle) {
            sidebar.classList.remove('collapsed');
            mainContent.classList.remove('expanded');
            menuToggle.classList.remove('active', 'pulse');
            menuToggle.setAttribute('aria-expanded', 'true');
            
            // Add animation class
            menuToggle.classList.add('animate');
            setTimeout(() => {
                menuToggle.classList.remove('animate');
            }, 600);
        }

        // Close sidebar with animation
        function closeSidebar(sidebar, mainContent, menuToggle) {
            sidebar.classList.add('collapsed');
            mainContent.classList.add('expanded');
            menuToggle.classList.add('active', 'pulse');
            menuToggle.setAttribute('aria-expanded', 'false');
            
            // Add animation class
            menuToggle.classList.add('animate');
            setTimeout(() => {
                menuToggle.classList.remove('animate');
            }, 600);
        }

        // Toggle sidebar function with enhanced animations
        function toggleSidebar() {
            const sidebar = document.querySelector('.sidebar');
            const mainContent = document.querySelector('.main-content');
            const menuToggle = document.getElementById('menuToggle');
            const headerTitle = document.querySelector('.header-left h1');
            
            isSidebarOpen = !isSidebarOpen;
            
            if (!isSidebarOpen) {
                closeSidebar(sidebar, mainContent, menuToggle);
                
                // Animate header title
                if (headerTitle) {
                    headerTitle.style.animation = 'none';
                    setTimeout(() => {
                        headerTitle.style.animation = 'slideInFromLeft 0.5s ease-out';
                    }, 10);
                }
            } else {
                openSidebar(sidebar, mainContent, menuToggle);
                
                // Animate header title
                if (headerTitle) {
                    headerTitle.style.animation = 'none';
                    setTimeout(() => {
                        headerTitle.style.animation = 'slideInFromLeft 0.5s ease-out';
                    }, 10);
                }
            }
            
            // Save state to localStorage
            localStorage.setItem('sidebarState', isSidebarOpen.toString());
        }

        // Add click animation to menu toggle
        function addMenuToggleAnimation() {
            const menuToggle = document.getElementById('menuToggle');
            if (menuToggle) {
                menuToggle.addEventListener('mousedown', function() {
                    this.style.transform = 'scale(0.95)';
                });
                
                menuToggle.addEventListener('mouseup', function() {
                    this.style.transform = 'scale(1)';
                });
                
                menuToggle.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1)';
                });
            }
        }

        /* ========= Helpers ========= */
        const $ = (sel, ctx = document) => ctx.querySelector(sel);
        const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
        const byId = (id) => document.getElementById(id);
        const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s || '').trim());
        const initials = (name = '') => name.trim().split(/\s+/).map(n => n[0]).join('').toUpperCase();
        const on = (el, ev, fn) => el && el.addEventListener(ev, fn);

        /* ========= Core elements ========= */
        const authContainer = byId('authContainer');
        const appContainer = byId('appContainer');

        const loginForm = byId('loginForm');
        const signupForm = byId('signupForm');

        const showSignupBtn = byId('showSignup');
        const showLoginBtn = byId('showLogin');

        const loginBtn = byId('loginBtn');
        const signupBtn = byId('signupBtn');
        const logoutBtn = byId('logoutBtn');

        const userNameEl = byId('userName');
        const userAvatarEl = byId('userAvatar');

        /* ========= Login Function ========= */
        function performLogin() {
            const usernameInput = byId('loginUsername');
            const passwordInput = byId('loginPassword');
            
            if (!usernameInput || !passwordInput) {
                alert('Please enter both username and password');
                return;
            }

            const username = usernameInput.value.trim();
            const password = passwordInput.value;

            if (!username || !password) {
                alert('Please enter both username and password');
                return;
            }

            // For demo purposes - in real app, this would be a server call
            // Check if user exists in localStorage
            const users = JSON.parse(localStorage.getItem('hospitalUsers')) || [];
            
            // Add demo users if none exist
            if (users.length === 0) {
                const demoUsers = [
                    {
                        fullName: 'Pharm. Tuvana',
                        username: 'Aseriy',
                        email: 'aseriy989@gmail.com',
                        password: 'password123',
                        role: 'pharmacist'
                    },
                    {
                        fullName: 'Nurse Mubbie ',
                        username: 'Mubbie',
                        email: 'nurse@hospital.com',
                        password: 'password123',
                        role: 'nurse'
                    },
                    {
                        fullName: 'Aseriy',
                        username: 'Tuvana',
                        email: 'aseriy989@gmail.com',
                        password: 'password123',
                        role: 'admin'
                    }
                ];
                localStorage.setItem('hospitalUsers', JSON.stringify(demoUsers));
            }

            const user = users.find(u => 
                (u.username === username || u.email === username) && 
                u.password === password
            );

            if (user) {
                // Store current user session
                localStorage.setItem('currentUser', JSON.stringify(user));
                
                // Update UI
                if (userNameEl) {
                    userNameEl.textContent = user.role === 'doctor' ? `Pharm. ${user.fullName.split(' ')[1]}` : user.fullName;
                }
                if (userAvatarEl) {
                    userAvatarEl.textContent = initials(user.fullName);
                }

                // Switch to main application
                if (authContainer) authContainer.style.display = 'none';
                if (appContainer) appContainer.style.display = 'flex';
                
                // Initialize sidebar state after login
                initSidebarState();
            } else {
                alert('Invalid username or password.');
            }
        }

        /* ========= Enter Key Login Functionality ========= */
        function setupEnterKeyLogin() {
            const loginUsername = byId('loginUsername');
            const loginPassword = byId('loginPassword');
            const signupFullName = byId('signupFullName');
            const signupUsername = byId('signupUsername');
            const signupPassword = byId('signupPassword');
            
            // Add Enter key event listeners to login form fields
            if (loginUsername) {
                loginUsername.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        // If password field is empty, focus on it
                        if (!loginPassword.value.trim()) {
                            loginPassword.focus();
                        } else {
                            performLogin();
                        }
                    }
                });
            }
            
            if (loginPassword) {
                loginPassword.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        performLogin();
                    }
                });
            }
            
            // Add Enter key event listeners to signup form fields
            if (signupFullName) {
                signupFullName.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        const signupUsername = byId('signupUsername');
                        if (signupUsername) signupUsername.focus();
                    }
                });
            }
            
            if (signupUsername) {
                signupUsername.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        const signupPassword = byId('signupPassword');
                        if (signupPassword) signupPassword.focus();
                    }
                });
            }
            
            if (signupPassword) {
                signupPassword.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        // Trigger signup if we're on the signup form
                        if (signupForm && signupForm.style.display !== 'none') {
                            performSignup();
                        }
                    }
                });
            }
        }

        /* ========= Auth view toggles ========= */
        if (showSignupBtn) {
            showSignupBtn.addEventListener('click', () => {
                if (loginForm) loginForm.style.display = 'none';
                if (signupForm) signupForm.style.display = 'block';
            });
        }

        if (showLoginBtn) {
            showLoginBtn.addEventListener('click', () => {
                if (signupForm) signupForm.style.display = 'none';
                if (loginForm) loginForm.style.display = 'block';
            });
        }

        /* ========= Login functionality ========= */
        if (loginBtn) {
            loginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                performLogin();
            });
        }

        /* ========= Signup Function ========= */
        function performSignup() {
            const fullNameInput = byId('signupFullName');
            const emailInput = byId('signupEmail');
            const usernameInput = byId('signupUsername');
            const passwordInput = byId('signupPassword');
            const roleInput = byId('signupRole');

            if (!fullNameInput || !usernameInput || !passwordInput) {
                alert('Please fill in all required fields');
                return;
            }

            const fullName = fullNameInput.value.trim();
            const email = emailInput ? emailInput.value.trim() : '';
            const username = usernameInput.value.trim();
            const password = passwordInput.value;
            const role = roleInput ? roleInput.value : 'staff';

            if (!fullName || !username || !password) {
                alert('Please fill in all required fields');
                return;
            }

            if (email && !isEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Get existing users
            const users = JSON.parse(localStorage.getItem('hospitalUsers')) || [];

            // Check if username already exists
            if (users.some(u => u.username === username)) {
                alert('Username already exists');
                return;
            }

            // Check if email already exists
            if (email && users.some(u => u.email === email)) {
                alert('Email already exists');
                return;
            }

            // Create new user
            const newUser = {
                fullName,
                username,
                email,
                password,
                role
            };

            users.push(newUser);
            localStorage.setItem('hospitalUsers', JSON.stringify(users));

            alert('Account created successfully! Please login with your new credentials.');
            
            // Switch to login form
            if (signupForm) signupForm.style.display = 'none';
            if (loginForm) loginForm.style.display = 'block';
            
            // Pre-fill the login form with the new username
            const loginUsername = byId('loginUsername');
            if (loginUsername) {
                loginUsername.value = username;
            }
        }

        /* ========= Signup functionality ========= */
        if (signupBtn) {
            signupBtn.addEventListener('click', (e) => {
                e.preventDefault();
                performSignup();
            });
        }

        /* ========= Logout functionality ========= */
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                // Clear current user session
                localStorage.removeItem('currentUser');

                // Switch back to auth view
                if (authContainer) authContainer.style.display = 'grid';
                if (appContainer) appContainer.style.display = 'none';

                // Clear form fields
                const loginUsername = byId('loginUsername');
                const loginPassword = byId('loginPassword');
                
                if (loginUsername) loginUsername.value = '';
                if (loginPassword) loginPassword.value = '';

                // Show login form by default
                if (signupForm) signupForm.style.display = 'none';
                if (loginForm) loginForm.style.display = 'block';
                
                // Focus on username field after logout
                setTimeout(() => {
                    if (loginUsername) loginUsername.focus();
                }, 100);
            });
        }

        /* ========= Session restore on page load ========= */
        document.addEventListener('DOMContentLoaded', () => {
            const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

            if (currentUser) {
                // User is logged in
                if (userNameEl) {
                    userNameEl.textContent = currentUser.role === 'doctor' ? `Pharm. ${currentUser.fullName.split(' ')[1]}` : currentUser.fullName;
                }
                if (userAvatarEl) {
                    userAvatarEl.textContent = initials(currentUser.fullName);
                }

                if (authContainer) authContainer.style.display = 'none';
                if (appContainer) appContainer.style.display = 'flex';
                
                // Initialize sidebar state
                initSidebarState();
            } else {
                // User is not logged in
                if (authContainer) authContainer.style.display = 'grid';
                if (appContainer) appContainer.style.display = 'none';
                
                // Ensure login form is visible
                if (signupForm) signupForm.style.display = 'none';
                if (loginForm) loginForm.style.display = 'block';
                
                // Focus on username field when page loads
                setTimeout(() => {
                    const loginUsername = byId('loginUsername');
                    if (loginUsername) loginUsername.focus();
                }, 500);
            }

            // Add event listener for menu toggle
            const menuToggle = byId('menuToggle');
            if (menuToggle) {
                menuToggle.addEventListener('click', toggleSidebar);
                addMenuToggleAnimation();
            }
            
            // Setup Enter key login functionality
            setupEnterKeyLogin();
        });

        /* ========= Sidebar page navigation ========= */
        document.querySelectorAll('.sidebar-menu a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                // Remove active class from all links
                document.querySelectorAll('.sidebar-menu a').forEach(a => a.classList.remove('active'));
                
                // Add active class to clicked link
                link.classList.add('active');

                // Hide all pages
                document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
                
                // Show selected page
                const pageId = link.getAttribute('data-page');
                const targetPage = document.getElementById(pageId);
                if (targetPage) {
                    targetPage.classList.add('active');
                }

                // Update header title
                const titleSpan = link.querySelector('span');
                const headerH1 = document.querySelector('.header-left h1');
                if (titleSpan && headerH1) {
                    headerH1.textContent = titleSpan.textContent;
                }
            });
        });

        /* ========= Dropdown Menu Functionality ========= */
        function setupDropdownMenus() {
            const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
            
            dropdownToggles.forEach(toggle => {
                toggle.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const dropdown = this.closest('.dropdown');
                    const isActive = dropdown.classList.contains('active');
                    
                    // Close all other dropdowns
                    document.querySelectorAll('.dropdown.active').forEach(activeDropdown => {
                        if (activeDropdown !== dropdown) {
                            activeDropdown.classList.remove('active');
                        }
                    });
                    
                    // Toggle current dropdown
                    dropdown.classList.toggle('active', !isActive);
                });
            });
            
            // Close dropdowns when clicking outside
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.dropdown')) {
                    document.querySelectorAll('.dropdown.active').forEach(dropdown => {
                        dropdown.classList.remove('active');
                    });
                }
            });
            
            // Handle dropdown menu item clicks
            document.querySelectorAll('.dropdown-menu a').forEach(menuItem => {
                menuItem.addEventListener('click', function(e) {
                    const pageId = this.getAttribute('data-page');
                    const targetPage = document.getElementById(pageId);
                    
                    if (targetPage) {
                        // Hide all pages
                        document.querySelectorAll('.page').forEach(page => {
                            page.classList.remove('active');
                        });
                        
                        // Show selected page
                        targetPage.classList.add('active');
                        
                        // Update header title
                        const headerH1 = document.querySelector('.header-left h1');
                        if (headerH1) {
                            headerH1.textContent = this.textContent;
                        }
                        
                        // Set active state
                        document.querySelectorAll('.sidebar-menu a').forEach(a => {
                            a.classList.remove('active');
                        });
                        this.classList.add('active');
                        
                        // Close dropdown after selection (on mobile)
                        if (window.innerWidth <= 768) {
                            const dropdown = this.closest('.dropdown');
                            if (dropdown) {
                                dropdown.classList.remove('active');
                            }
                        }
                    }
                });
            });
        }

        // Initialize dropdown menus when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            setupDropdownMenus();
        });

        /* ========= Tabs functionality ========= */
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.getAttribute('data-tab');
                const scope = tab.closest('.card-body') || document;

                // Remove active class from all tabs in the same container
                tab.parentElement.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');

                // Hide all tab contents in the same container
                scope.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                // Show selected tab content
                const targetContent = document.getElementById(tabId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });

        /* ========= Modal functionality ========= */
        const modalMap = [
            ['addPatientBtn', 'addPatientModal'],
            ['newLabOrderBtn', 'labOrderModal'],
            ['newAppointmentBtn', 'appointmentModal'],
            ['triagePatientBtn', 'triagePatientModal'],
            ['scheduleSurgeryBtn', 'surgeryModal'],
            ['addEmployeeBtn', 'employeeModal'],
            ['addInventoryBtn', 'inventoryModal'],
            ['newPrescriptionBtn', 'prescriptionModal'],
            ['admitPatientBtn', 'admitPatientModal'],
            ['generateInvoiceBtn', 'invoiceModal'],
            ['createPurchaseOrderBtn', 'purchaseOrderModal'],
            ['requestLeaveBtn', 'leaveRequestModal'],
            ['scheduleMaintenanceBtn', 'equipmentMaintenanceModal']
        ];

        // Add event listeners for modal triggers
        modalMap.forEach(([btnId, modalId]) => {
            const btn = document.getElementById(btnId);
            const modal = document.getElementById(modalId);
            
            if (btn && modal) {
                btn.addEventListener('click', () => {
                    modal.style.display = 'flex';
                });
            }
        });

        // Close modals when clicking close button or outside
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.closest('.modal').style.display = 'none';
            });
        });

        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });

        /* ========= Form submissions ========= */
        // Patient Form
        const patientForm = document.getElementById('patientForm');
        if (patientForm) {
            patientForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Patient added successfully!');
                document.getElementById('addPatientModal').style.display = 'none';
                patientForm.reset();
            });
        }

        // Lab Order Form
        const labOrderForm = document.getElementById('labOrderForm');
        if (labOrderForm) {
            labOrderForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Lab order created successfully!');
                document.getElementById('labOrderModal').style.display = 'none';
                labOrderForm.reset();
            });
        }

        // Appointment Form
        const appointmentForm = document.getElementById('appointmentForm');
        if (appointmentForm) {
            appointmentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Appointment scheduled successfully!');
                document.getElementById('appointmentModal').style.display = 'none';
                appointmentForm.reset();
            });
        }

        // Employee Form
        const employeeForm = document.getElementById('employeeForm');
        if (employeeForm) {
            employeeForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Employee added successfully!');
                document.getElementById('employeeModal').style.display = 'none';
                employeeForm.reset();
            });
        }

        // Inventory Form
        const inventoryForm = document.getElementById('inventoryForm');
        if (inventoryForm) {
            inventoryForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Inventory item added successfully!');
                document.getElementById('inventoryModal').style.display = 'none';
                inventoryForm.reset();
            });
        }

        // Triage Form
        const triageForm = document.getElementById('triageForm');
        if (triageForm) {
            triageForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Patient triaged successfully!');
                document.getElementById('triagePatientModal').style.display = 'none';
                triageForm.reset();
            });
        }

        // Surgery Form
        const surgeryForm = document.getElementById('surgeryForm');
        if (surgeryForm) {
            surgeryForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Surgery scheduled successfully!');
                document.getElementById('surgeryModal').style.display = 'none';
                surgeryForm.reset();
            });
        }

        // Prescription Form
        const prescriptionForm = document.getElementById('prescriptionForm');
        if (prescriptionForm) {
            prescriptionForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Prescription created successfully!');
                document.getElementById('prescriptionModal').style.display = 'none';
                prescriptionForm.reset();
            });
        }

        // Admit Form
        const admitForm = document.getElementById('admitForm');
        if (admitForm) {
            admitForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Patient admitted successfully!');
                document.getElementById('admitPatientModal').style.display = 'none';
                admitForm.reset();
            });
        }

        // Invoice Form
        const invoiceForm = document.getElementById('invoiceForm');
        if (invoiceForm) {
            invoiceForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Invoice generated successfully!');
                document.getElementById('invoiceModal').style.display = 'none';
                invoiceForm.reset();
            });
        }

        // Purchase Order Form
        const purchaseOrderForm = document.getElementById('purchaseOrderForm');
        if (purchaseOrderForm) {
            purchaseOrderForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Purchase order created successfully!');
                document.getElementById('purchaseOrderModal').style.display = 'none';
                purchaseOrderForm.reset();
            });
        }

        // Leave Request Form
        const leaveRequestForm = document.getElementById('leaveRequestForm');
        if (leaveRequestForm) {
            leaveRequestForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Leave request submitted successfully!');
                document.getElementById('leaveRequestModal').style.display = 'none';
                leaveRequestForm.reset();
            });
        }

        // Equipment Maintenance Form
        const equipmentMaintenanceForm = document.getElementById('equipmentMaintenanceForm');
        if (equipmentMaintenanceForm) {
            equipmentMaintenanceForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Maintenance scheduled successfully!');
                document.getElementById('equipmentMaintenanceModal').style.display = 'none';
                equipmentMaintenanceForm.reset();
            });
        }

        /* ========= Patient search functionality ========= */
        const patientSearch = document.getElementById('patientSearch');
        if (patientSearch) {
            patientSearch.addEventListener('input', (e) => {
                const term = e.target.value.toLowerCase();
                document.querySelectorAll('#emr table tbody tr').forEach(row => {
                    const text = row.textContent.toLowerCase();
                    row.style.display = text.includes(term) ? '' : 'none';
                });
            });
        }

        /* ========= Theme switching ========= */
        const themeToggle = document.getElementById('themeToggle');
        const themeButtons = document.querySelectorAll('.theme-btn');

        // Function to set theme
        function setTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            
            // Update toggle switch
            if (themeToggle) {
                themeToggle.checked = theme === 'dark';
            }
            
            // Update theme buttons
            themeButtons.forEach(btn => {
                if (btn.getAttribute('data-theme') === theme) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }

        // Theme toggle switch event
        if (themeToggle) {
            themeToggle.addEventListener('change', (e) => {
                const theme = e.target.checked ? 'dark' : 'light';
                setTheme(theme);
            });
        }

        // Theme buttons event
        themeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const theme = btn.getAttribute('data-theme');
                if (theme === 'auto') {
                    const mq = window.matchMedia('(prefers-color-scheme: dark)');
                    setTheme(mq.matches ? 'dark' : 'light');
                    mq.addEventListener('change', e => {
                        setTheme(e.matches ? 'dark' : 'light');
                    });
                } else {
                    setTheme(theme);
                }
            });
        });

        // Initialize theme on page load
        window.addEventListener('DOMContentLoaded', () => {
            const savedTheme = localStorage.getItem('theme') || 'light';
            setTheme(savedTheme);
        });

        /* ========= Notification bell animation ========= */
        const notificationBell = document.querySelector('.notification-bell');
        if (notificationBell) {
            notificationBell.addEventListener('click', function() {
                this.classList.add('animate');
                setTimeout(() => {
                    this.classList.remove('animate');
                }, 600);
            });
        }

        /* ========= User avatar hover effects ========= */
        const userAvatar = document.getElementById('userAvatar');
        if (userAvatar) {
            userAvatar.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1) rotate(5deg)';
            });
            
            userAvatar.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
            });
        }

        /* ========= Enhanced button animations ========= */
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('mousedown', function() {
                this.style.transform = 'translateY(1px)';
            });
            
            button.addEventListener('mouseup', function() {
                this.style.transform = 'translateY(-3px)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });

        console.log('Phamarcy Management System initialized with enhanced animations and Enter key login');

        /* ========= Patient Registration Functions ========= */
function calculateAge() {
    const dob = new Date(document.getElementById('dob').value);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    
    document.getElementById('age').value = age + ' years';
}

function generatePatientId() {
    const prefix = 'P-';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return prefix + randomNum;
}

function showRegistrationForm(type) {
    const form = document.getElementById('patientRegistrationForm');
    const patientIdField = document.getElementById('patientId');
    
    // Generate new patient ID
    patientIdField.value = generatePatientId();
    
    // Set current date and time
    const now = new Date();
    document.getElementById('registrationDate').value = now.toISOString().slice(0, 16);
    
    // Scroll to form
    form.scrollIntoView({ behavior: 'smooth' });
    
    // Show appropriate message based on type
    let message = '';
    switch(type) {
        case 'new':
            message = 'New patient registration form ready. Please fill in all required details.';
            break;
        case 'emergency':
            message = 'Emergency registration mode. Fill minimal details first for immediate care.';
            // Auto-fill emergency flag if needed
            break;
        case 'followup':
            message = 'Follow-up registration for existing patient. Verify and update information.';
            break;
        case 'insurance':
            message = 'Insurance verification mode. Please provide complete insurance details.';
            break;
    }
    
    if (message) {
        alert(message);
    }
}

function clearRegistrationForm() {
    if (confirm('Are you sure you want to clear the form? All unsaved data will be lost.')) {
        document.getElementById('patientRegistrationForm').reset();
        document.getElementById('patientId').value = 'P-';
        document.getElementById('age').value = '';
    }
}

function saveAsDraft() {
    // In a real application, this would save to local storage or backend
    alert('Patient registration saved as draft. You can continue later.');
}

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('patientRegistrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const requiredFields = registrationForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'var(--danger)';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                alert('Please fill in all required fields marked with *');
                return;
            }
            
            // Simulate form submission
            const patientName = document.getElementById('firstName').value + ' ' + document.getElementById('lastName').value;
            alert(`Patient ${patientName} registered successfully!\nPatient ID: ${document.getElementById('patientId').value}`);
            
            // Reset form and generate new ID
            registrationForm.reset();
            document.getElementById('patientId').value = generatePatientId();
            document.getElementById('age').value = '';
            
            // Set current date
            const now = new Date();
            document.getElementById('registrationDate').value = now.toISOString().slice(0, 16);
        });
    }
    
    // Initialize form with current date and generated ID
    if (document.getElementById('registrationDate')) {
        const now = new Date();
        document.getElementById('registrationDate').value = now.toISOString().slice(0, 16);
        document.getElementById('patientId').value = generatePatientId();
    }
});

/* ========= Patient Records Functions ========= */
function toggleSelectAllPatients() {
    const selectAll = document.getElementById('selectAllPatients');
    const checkboxes = document.querySelectorAll('.patient-checkbox');
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAll.checked;
    });
}

function viewPatientRecord(patientId) {
    alert(`Viewing patient record: ${patientId}\nThis would open the detailed patient profile.`);
    // In real application, this would navigate to patient detail view
}

function editPatientRecord(patientId) {
    alert(`Editing patient record: ${patientId}\nThis would open the patient edit form.`);
    // In real application, this would open edit modal/form
}

function showPatientOptions(patientId) {
    alert(`Showing options for patient: ${patientId}\nOptions: Medical History, Appointments, Billing, etc.`);
    // In real application, this would show a dropdown menu with options
}

function searchPatients() {
    const searchTerm = document.getElementById('patientRecordsSearch').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const departmentFilter = document.getElementById('departmentFilter').value;
    
    const rows = document.querySelectorAll('#patientRecordsTable tbody tr');
    let visibleCount = 0;
    
    rows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        const statusBadge = row.querySelector('.badge').textContent.toLowerCase();
        const doctorCell = row.cells[6].textContent.toLowerCase();
        
        const matchesSearch = !searchTerm || rowText.includes(searchTerm);
        const matchesStatus = !statusFilter || statusBadge.includes(statusFilter);
        const matchesDepartment = !departmentFilter || doctorCell.includes(departmentFilter);
        
        if (matchesSearch && matchesStatus && matchesDepartment) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    // Update visible count display
    const countDisplay = document.querySelector('.card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = `Showing ${visibleCount} of 1,254 patients`;
    }
}

function clearFilters() {
    document.getElementById('patientRecordsSearch').value = '';
    document.getElementById('statusFilter').value = '';
    document.getElementById('departmentFilter').value = '';
    document.getElementById('dateRangeFilter').value = '';
    
    // Show all rows
    const rows = document.querySelectorAll('#patientRecordsTable tbody tr');
    rows.forEach(row => {
        row.style.display = '';
    });
    
    // Reset count display
    const countDisplay = document.querySelector('.card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = 'Showing 1-10 of 1,254 patients';
    }
}

function exportSelectedPatients() {
    const selectedPatients = document.querySelectorAll('.patient-checkbox:checked');
    if (selectedPatients.length === 0) {
        alert('Please select at least one patient to export.');
        return;
    }
    alert(`Exporting ${selectedPatients.length} patient records...`);
}

function bulkUpdateStatus() {
    const selectedPatients = document.querySelectorAll('.patient-checkbox:checked');
    if (selectedPatients.length === 0) {
        alert('Please select patients to update.');
        return;
    }
    alert(`Bulk updating status for ${selectedPatients.length} patients...`);
}

function sendAppointmentReminders() {
    alert('Sending appointment reminders to selected patients...');
}

function generateReports() {
    alert('Generating patient records report...');
}

// Initialize search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('patientRecordsSearch');
    if (searchInput) {
        searchInput.addEventListener('input', searchPatients);
    }
    
    // Add event listeners to filter dropdowns
    const filters = ['statusFilter', 'departmentFilter', 'dateRangeFilter'];
    filters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', searchPatients);
        }
    });
});

/* ========= Patient Billing Functions ========= */
function quickGenerateInvoice() {
    alert('Opening quick invoice generator...');
    // In real application, this would open a modal for quick invoice creation
}

function processBatchPayments() {
    alert('Opening batch payment processor...');
    // In real application, this would open batch payment interface
}

function generateInsuranceClaims() {
    alert('Generating insurance claims batch...');
    // In real application, this would process multiple insurance claims
}

function runBillingReports() {
    alert('Generating billing reports...');
    // In real application, this would generate financial reports
}

function viewInvoice(invoiceId) {
    alert(`Viewing invoice: ${invoiceId}\nThis would show detailed invoice view.`);
    // In real application, this would open invoice detail modal
}

function printInvoice(invoiceId) {
    alert(`Printing invoice: ${invoiceId}\nOpening print dialog...`);
    // In real application, this would generate printable invoice
}

function emailInvoice(invoiceId) {
    alert(`Emailing invoice: ${invoiceId}\nThis would open email composer.`);
    // In real application, this would integrate with email system
}

function processPayment(invoiceId) {
    alert(`Processing payment for: ${invoiceId}\nThis would open payment processing form.`);
    // In real application, this would open payment modal
}

function sendReminder(invoiceId) {
    alert(`Sending payment reminder for: ${invoiceId}\nReminder sent via SMS and email.`);
    // In real application, this would send automated reminders
}

function sendFinalNotice(invoiceId) {
    alert(`Sending final notice for: ${invoiceId}\nFinal notice sent to patient.`);
    // In real application, this would send final payment demand
}

function applyPartialPayment(invoiceId) {
    alert(`Applying partial payment for: ${invoiceId}\nOpening partial payment form.`);
    // In real application, this would handle partial payments
}

function setupPaymentPlan(invoiceId) {
    alert(`Setting up payment plan for: ${invoiceId}\nOpening payment plan setup.`);
    // In real application, this would create installment plans
}

function recordPayment(invoiceId) {
    alert(`Recording manual payment for: ${invoiceId}\nOpening payment recording form.`);
    // In real application, this would record offline payments
}

function searchBills() {
    const searchTerm = document.getElementById('billingSearch').value.toLowerCase();
    const statusFilter = document.getElementById('billingStatusFilter').value;
    const methodFilter = document.getElementById('paymentMethodFilter').value;
    
    const rows = document.querySelectorAll('#billingTable tbody tr');
    let visibleCount = 0;
    
    rows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        const statusBadge = row.querySelector('.badge').textContent.toLowerCase();
        const insuranceCell = row.cells[5].textContent.toLowerCase();
        
        const matchesSearch = !searchTerm || rowText.includes(searchTerm);
        const matchesStatus = !statusFilter || statusBadge.includes(statusFilter);
        const matchesMethod = !methodFilter || insuranceCell.includes(methodFilter);
        
        if (matchesSearch && matchesStatus && matchesMethod) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    // Update visible count display
    const countDisplay = document.querySelector('#patient-billing .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = `Showing ${visibleCount} of 156 invoices`;
    }
}

function clearBillingFilters() {
    document.getElementById('billingSearch').value = '';
    document.getElementById('billingStatusFilter').value = '';
    document.getElementById('paymentMethodFilter').value = '';
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
    
    // Show all rows
    const rows = document.querySelectorAll('#billingTable tbody tr');
    rows.forEach(row => {
        row.style.display = '';
    });
    
    // Reset count display
    const countDisplay = document.querySelector('#patient-billing .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = 'Showing 1-8 of 156 invoices';
    }
}

function loadInvoiceDetails() {
    const selectedInvoice = document.getElementById('selectedInvoice').value;
    if (selectedInvoice) {
        // In real application, this would load invoice details and auto-fill amount
        document.getElementById('paymentAmount').value = '187500'; // Example amount
        document.getElementById('paymentDate').value = new Date().toISOString().split('T')[0];
    }
}

function clearPaymentForm() {
    document.getElementById('selectedInvoice').value = '';
    document.getElementById('paymentAmount').value = '';
    document.getElementById('paymentMethod').value = '';
    document.getElementById('paymentDate').value = '';
    document.getElementById('paymentReference').value = '';
    document.getElementById('paymentNotes').value = '';
}

function processSinglePayment() {
    const invoice = document.getElementById('selectedInvoice').value;
    const amount = document.getElementById('paymentAmount').value;
    const method = document.getElementById('paymentMethod').value;
    
    if (!invoice || !amount || !method) {
        alert('Please fill in all required payment fields.');
        return;
    }
    
    alert(`Payment processed successfully!\nInvoice: ${invoice}\nAmount: ${amount} TSH\nMethod: ${method}`);
    clearPaymentForm();
}

// Initialize billing search functionality
document.addEventListener('DOMContentLoaded', function() {
    const billingSearch = document.getElementById('billingSearch');
    if (billingSearch) {
        billingSearch.addEventListener('input', searchBills);
    }
    
    // Add event listeners to billing filter dropdowns
    const billingFilters = ['billingStatusFilter', 'paymentMethodFilter'];
    billingFilters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', searchBills);
        }
    });
    
    // Set default payment date to today
    const paymentDate = document.getElementById('paymentDate');
    if (paymentDate) {
        paymentDate.value = new Date().toISOString().split('T')[0];
    }
});

/* ========= Insurance Claims Functions ========= */
function submitNewClaim() {
    alert('Opening new claim submission form...');
    // In real application, this would open claim submission modal
}

function batchSubmitClaims() {
    alert('Opening batch claims submission...');
    // In real application, this would open batch processing interface
}

function trackClaimsStatus() {
    alert('Opening claims tracking dashboard...');
    // In real application, this would show real-time tracking
}

function generateClaimsReport() {
    alert('Generating insurance claims report...');
    // In real application, this would generate comprehensive reports
}

function viewClaimDetails(claimId) {
    alert(`Viewing claim details: ${claimId}\nThis would show detailed claim information.`);
    // In real application, this would open claim detail modal
}

function trackClaim(claimId) {
    alert(`Tracking claim: ${claimId}\nThis would show claim status and timeline.`);
    // In real application, this would show tracking information
}

function downloadClaim(claimId) {
    alert(`Downloading claim documents: ${claimId}\nPreparing download package...`);
    // In real application, this would generate downloadable claim package
}

function submitAdditionalDocs(claimId) {
    alert(`Submitting additional documents for: ${claimId}\nOpening document upload form.`);
    // In real application, this would open document upload interface
}

function resubmitClaim(claimId) {
    alert(`Resubmitting claim: ${claimId}\nThis would open claim correction form.`);
    // In real application, this would allow claim resubmission
}

function appealClaim(claimId) {
    alert(`Initiating appeal for: ${claimId}\nStarting appeals process.`);
    // In real application, this would start formal appeal procedure
}

function contactInsurer(claimId) {
    alert(`Contacting insurer for: ${claimId}\nThis would open communication interface.`);
    // In real application, this would integrate with communication system
}

function downloadEOB(claimId) {
    alert(`Downloading EOB for: ${claimId}\nExplanation of Benefits document.`);
    // In real application, this would download EOB document
}

function archiveClaim(claimId) {
    alert(`Archiving claim: ${claimId}\nClaim moved to archives.`);
    // In real application, this would archive completed claims
}

function searchClaims() {
    const searchTerm = document.getElementById('claimsSearch').value.toLowerCase();
    const statusFilter = document.getElementById('claimStatusFilter').value;
    const providerFilter = document.getElementById('insuranceProviderFilter').value;
    
    const rows = document.querySelectorAll('#claimsTable tbody tr');
    let visibleCount = 0;
    
    rows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        const statusBadge = row.querySelector('.badge').textContent.toLowerCase();
        const providerCell = row.cells[2].textContent.toLowerCase();
        
        const matchesSearch = !searchTerm || rowText.includes(searchTerm);
        const matchesStatus = !statusFilter || statusBadge.includes(statusFilter);
        const matchesProvider = !providerFilter || providerCell.includes(providerFilter);
        
        if (matchesSearch && matchesStatus && matchesProvider) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    // Update visible count display
    const countDisplay = document.querySelector('#insurance-claims .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = `Showing ${visibleCount} of 156 claims`;
    }
}

function clearClaimsFilters() {
    document.getElementById('claimsSearch').value = '';
    document.getElementById('claimStatusFilter').value = '';
    document.getElementById('insuranceProviderFilter').value = '';
    document.getElementById('claimsStartDate').value = '';
    document.getElementById('claimsEndDate').value = '';
    
    // Show all rows
    const rows = document.querySelectorAll('#claimsTable tbody tr');
    rows.forEach(row => {
        row.style.display = '';
    });
    
    // Reset count display
    const countDisplay = document.querySelector('#insurance-claims .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = 'Showing 1-8 of 156 claims';
    }
}

function loadPatientInsurance() {
    const patientSelect = document.getElementById('claimPatient');
    const selectedPatient = patientSelect.value;
    
    if (selectedPatient) {
        // In real application, this would load patient's insurance details from database
        const insuranceData = {
            'P-1001': { provider: 'NHIF', policy: 'NH-234567', coverage: '80%' },
            'P-1002': { provider: 'Medilynx', policy: 'ML-987654', coverage: '75%' },
            'P-1003': { provider: 'Blue Cross', policy: 'BC-456123', coverage: '80%' },
            'P-1004': { provider: 'Aetna', policy: 'AE-789012', coverage: '80%' }
        };
        
        const data = insuranceData[selectedPatient];
        if (data) {
            document.getElementById('claimInsuranceProvider').value = data.provider;
            document.getElementById('claimPolicyNumber').value = data.policy;
            document.getElementById('claimExpectedCoverage').value = data.coverage;
            
            // Calculate amounts based on coverage
            calculateClaimAmounts();
        }
    }
}

function calculateClaimAmounts() {
    // Calculate total from selected services
    let totalAmount = 0;
    const services = [
        { id: 'service1', amount: 45000 },
        { id: 'service2', amount: 85000 },
        { id: 'service3', amount: 65000 },
        { id: 'service4', amount: 50750 },
        { id: 'service5', amount: 150000 }
    ];
    
    services.forEach(service => {
        const checkbox = document.getElementById(service.id);
        if (checkbox && checkbox.checked) {
            totalAmount += service.amount;
        }
    });
    
    // Update amounts
    const coverage = document.getElementById('claimExpectedCoverage').value;
    const coveragePercent = parseInt(coverage) / 100;
    const coveredAmount = totalAmount * coveragePercent;
    const patientResponsibility = totalAmount - coveredAmount;
    
    document.getElementById('claimTotalAmount').value = totalAmount.toLocaleString() + ' TSH';
    document.getElementById('claimPatientResponsibility').value = patientResponsibility.toLocaleString() + ' TSH';
}

function clearClaimForm() {
    document.getElementById('claimPatient').value = '';
    document.getElementById('claimServiceDate').value = '';
    document.getElementById('claimInsuranceProvider').value = '';
    document.getElementById('claimPolicyNumber').value = '';
    document.getElementById('claimGroupNumber').value = '';
    document.getElementById('claimClinicalNotes').value = '';
    document.getElementById('claimDocuments').value = '';
    
    // Uncheck all service checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Reset amounts
    document.getElementById('claimTotalAmount').value = '0 TSH';
    document.getElementById('claimPatientResponsibility').value = '0 TSH';
}

function submitClaim() {
    const patient = document.getElementById('claimPatient').value;
    const serviceDate = document.getElementById('claimServiceDate').value;
    const totalAmount = document.getElementById('claimTotalAmount').value;
    
    if (!patient || !serviceDate || totalAmount === '0 TSH') {
        alert('Please fill in all required fields and select at least one service.');
        return;
    }
    
    alert(`Insurance claim submitted successfully!\nPatient: ${patient}\nTotal Amount: ${totalAmount}\nStatus: Submitted for processing`);
    clearClaimForm();
}

// Initialize claims functionality
document.addEventListener('DOMContentLoaded', function() {
    const claimsSearch = document.getElementById('claimsSearch');
    if (claimsSearch) {
        claimsSearch.addEventListener('input', searchClaims);
    }
    
    // Add event listeners to claims filter dropdowns
    const claimsFilters = ['claimStatusFilter', 'insuranceProviderFilter'];
    claimsFilters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', searchClaims);
        }
    });
    
    // Set default service date to today
    const serviceDate = document.getElementById('claimServiceDate');
    if (serviceDate) {
        serviceDate.value = new Date().toISOString().split('T')[0];
    }
    
    // Add event listeners to service checkboxes for real-time calculation
    const serviceCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    serviceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateClaimAmounts);
    });
});

/* ========= Patient Portal Functions ========= */
function sendBulkInvites() {
    alert('Opening bulk invitation manager...\nThis would allow sending invites to multiple patients.');
    // In real application, this would open bulk invitation interface
}

function managePortalUsers() {
    alert('Opening user management dashboard...\nThis would show comprehensive user management tools.');
    // In real application, this would open user management interface
}

function viewPortalAnalytics() {
    alert('Opening portal analytics dashboard...\nThis would show detailed usage statistics and reports.');
    // In real application, this would show analytics dashboard
}

function configurePortalSettings() {
    alert('Opening portal configuration...\nThis would allow customizing portal features and settings.');
    // In real application, this would open settings configuration
}

function viewUserActivity(patientId) {
    alert(`Viewing activity for patient: ${patientId}\nThis would show detailed user activity timeline.`);
    // In real application, this would show user activity dashboard
}

function sendMessageToUser(patientId) {
    alert(`Sending message to patient: ${patientId}\nThis would open secure messaging interface.`);
    // In real application, this would open secure messaging modal
}

function manageUserAccess(patientId) {
    alert(`Managing access for patient: ${patientId}\nThis would open user access control panel.`);
    // In real application, this would open access management interface
}

function sendReminderEmail(patientId) {
    alert(`Sending reminder email to patient: ${patientId}\nReminder email sent successfully.`);
    // In real application, this would send automated reminder emails
}

function resendInvitation(patientId) {
    alert(`Resending portal invitation to patient: ${patientId}\nInvitation email/SMS sent.`);
    // In real application, this would resend invitation
}

function viewInvitationStatus(patientId) {
    alert(`Viewing invitation status for patient: ${patientId}\nThis would show invitation history and status.`);
    // In real application, this would show invitation tracking
}

function cancelInvitation(patientId) {
    if (confirm(`Are you sure you want to cancel the portal invitation for patient ${patientId}?`)) {
        alert(`Portal invitation cancelled for patient: ${patientId}`);
        // In real application, this would cancel pending invitation
    }
}

function resetPortalSettings() {
    if (confirm('Are you sure you want to reset all portal settings to defaults?')) {
        // Reset checkboxes
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            if (checkbox.id.includes('feature')) {
                checkbox.checked = true; // Default all features enabled
            }
        });
        
        // Reset select elements
        document.getElementById('autoApproveAppointments').value = 'disabled';
        document.getElementById('messageResponseTime').value = '48h';
        document.getElementById('labResultsDelay').value = '24h';
        
        alert('Portal settings reset to defaults.');
    }
}

function savePortalSettings() {
    // Collect feature settings
    const features = {
        appointments: document.getElementById('featureAppointments').checked,
        messaging: document.getElementById('featureMessaging').checked,
        prescriptions: document.getElementById('featurePrescriptions').checked,
        labResults: document.getElementById('featureLabResults').checked,
        billing: document.getElementById('featureBilling').checked,
        medicalRecords: document.getElementById('featureMedicalRecords').checked
    };
    
    // Collect other settings
    const settings = {
        autoApprove: document.getElementById('autoApproveAppointments').value,
        responseTime: document.getElementById('messageResponseTime').value,
        resultsDelay: document.getElementById('labResultsDelay').value
    };
    
    alert('Portal settings saved successfully!\nFeatures and preferences updated.');
    // In real application, this would save to backend
}

function searchPortalUsers() {
    const searchTerm = document.getElementById('portalSearch').value.toLowerCase();
    const rows = document.querySelectorAll('#portalUsersTable tbody tr');
    let visibleCount = 0;
    
    rows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        if (!searchTerm || rowText.includes(searchTerm)) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    // Update visible count display
    const countDisplay = document.querySelector('#patient-portal .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = `Showing ${visibleCount} of 856 portal users`;
    }
}

function clearPortalFilters() {
    const searchInput = document.getElementById('portalSearch');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Show all rows
    const rows = document.querySelectorAll('#portalUsersTable tbody tr');
    rows.forEach(row => {
        row.style.display = '';
    });
    
    // Reset count display
    const countDisplay = document.querySelector('#patient-portal .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = '856 registered users';
    }
}

// Initialize portal functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add search functionality if search input exists
    const portalSearch = document.getElementById('portalSearch');
    if (portalSearch) {
        portalSearch.addEventListener('input', searchPortalUsers);
    }
    
    // Set default values for new features
    const medicalRecordsCheckbox = document.getElementById('featureMedicalRecords');
    if (medicalRecordsCheckbox) {
        medicalRecordsCheckbox.checked = false; // Default disabled for security
    }
});

/* ========= Enhanced EMR Functions ========= */
function quickClinicalNote() {
    alert('Opening quick clinical note template...\nThis would open a SOAP note form for rapid documentation.');
    // In real application, this would open clinical note modal
}

function vitalSignsEntry() {
    alert('Opening vital signs entry form...\nThis would allow quick recording of patient vitals.');
    // In real application, this would open vital signs form
}

function medicationReconciliation() {
    alert('Opening medication reconciliation...\nThis would help review and update patient medications.');
    // In real application, this would open med rec interface
}

function problemListUpdate() {
    alert('Opening problem list management...\nThis would allow updating active medical problems.');
    // In real application, this would open problem list manager
}

function searchEMRPatients() {
    const searchTerm = document.getElementById('emrPatientSearch').value.toLowerCase();
    // In real application, this would search patient database
    alert(`Searching EMR patients for: ${searchTerm}\nThis would filter patient list.`);
}

function clearEMRFilters() {
    document.getElementById('emrPatientSearch').value = '';
    document.getElementById('emrDepartmentFilter').value = '';
    document.getElementById('emrStatusFilter').value = '';
    document.getElementById('emrProviderFilter').value = '';
    alert('EMR filters cleared.');
}

function addNewClinicalNote() {
    alert('Opening new clinical note form...\nThis would open a comprehensive SOAP note template.');
    // In real application, this would open clinical note modal
}

function recordNewVitals() {
    alert('Opening vital signs recording form...\nThis would allow entering new vital measurements.');
    // In real application, this would open vitals form
}

function prescribeNewMedication() {
    alert('Opening medication prescription form...\nThis would allow prescribing new medications.');
    // In real application, this would open prescription modal
}

function addNewAllergy() {
    alert('Opening allergy documentation form...\nThis would allow recording new patient allergies.');
    // In real application, this would open allergy form
}

function addNewProblem() {
    alert('Opening problem addition form...\nThis would allow adding new medical problems to the list.');
    // In real application, this would open problem form
}

// Initialize EMR tab functionality
document.addEventListener('DOMContentLoaded', function() {
    // EMR tab switching
    const emrTabs = document.querySelectorAll('#emr .tab');
    emrTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            const emrContainer = this.closest('.card-body');
            
            // Remove active class from all tabs in EMR section
            emrContainer.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');

            // Hide all tab contents in EMR section
            emrContainer.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // Show selected tab content
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // EMR search functionality
    const emrSearch = document.getElementById('emrPatientSearch');
    if (emrSearch) {
        emrSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchEMRPatients();
            }
        });
    }
});
           
/* ========= Enhanced EHR Functions ========= */
function loadEHRPatientData() {
    const patientSelect = document.getElementById('ehrPatientSelect');
    const selectedPatient = patientSelect.value;
    
    if (selectedPatient) {
        // In real application, this would load comprehensive EHR data from multiple systems
        alert(`Loading comprehensive EHR data for patient: ${selectedPatient}\nIntegrating data from EMR, Lab, Radiology, Pharmacy...`);
        
        // Update patient header information
        updateEHRPatientHeader(selectedPatient);
    }
}

function updateEHRPatientHeader(patientId) {
    // In real application, this would update the patient header with real data
    const patientData = {
        'P-1001': { name: 'Robert Johnson', completeness: '95%' },
        'P-1002': { name: 'Sarah Williams', completeness: '88%' },
        'P-1003': { name: 'Michael Brown', completeness: '92%' },
        'P-1004': { name: 'Jennifer Davis', completeness: '85%' },
        'P-1005': { name: 'David Wilson', completeness: '78%' }
    };
    
    const data = patientData[patientId];
    if (data) {
        // Update the card header title and completeness badge
        const cardHeader = document.querySelector('#ehr .card-header h3');
        const completenessBadge = document.querySelector('#ehr .card-header .badge-info');
        
        if (cardHeader) {
            cardHeader.textContent = `Comprehensive EHR - ${data.name} (${patientId})`;
        }
        
        if (completenessBadge) {
            completenessBadge.textContent = `EHR Complete: ${data.completeness}`;
        }
    }
}

function updateEHRTimeRange() {
    const timeRange = document.getElementById('ehrTimeRange').value;
    alert(`Updating EHR view to show data from: ${timeRange}\nThis would filter all historical data.`);
    // In real application, this would filter all data tables and charts
}

function generateEHRSummary() {
    alert('Generating comprehensive health summary report...\nThis would create a PDF summary of the patient\'s entire health record.');
    // In real application, this would generate a detailed health summary
}

function viewClinicalTimeline() {
    alert('Opening clinical timeline view...\nThis would show an interactive timeline of all clinical events.');
    // In real application, this would open a timeline visualization
}

function exportEHRData() {
    alert('Opening EHR data export options...\nFormats available: CCDA, PDF, XML, JSON.');
    // In real application, this would provide export options in standard formats
}

function shareEHRRecord() {
    alert('Opening secure record sharing interface...\nThis would allow sharing with other healthcare providers.');
    // In real application, this would open secure sharing interface
}

// Initialize EHR tab functionality
document.addEventListener('DOMContentLoaded', function() {
    // EHR tab switching
    const ehrTabs = document.querySelectorAll('#ehr .tab');
    ehrTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            const ehrContainer = this.closest('.card-body');
            
            // Remove active class from all tabs in EHR section
            ehrContainer.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');

            // Hide all tab contents in EHR section
            ehrContainer.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // Show selected tab content
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Initialize with default patient data
    setTimeout(() => {
        loadEHRPatientData();
    }, 100);
});

/* ========= Clinical Notes Functions ========= */
function createSOAPNote() {
    alert('Opening SOAP Note template...\nThis would open a structured SOAP note form for documentation.');
    // In real application, this would open SOAP note creation interface
}

function createProgressNote() {
    alert('Opening Progress Note template...\nThis would open a progress note form for follow-up visits.');
    // In real application, this would open progress note interface
}

function createConsultNote() {
    alert('Opening Consult Note template...\nThis would open a consultation note form for specialist referrals.');
    // In real application, this would open consult note interface
}

function createProcedureNote() {
    alert('Opening Procedure Note template...\nThis would open a procedure documentation form.');
    // In real application, this would open procedure note interface
}

function viewClinicalNote(noteId) {
    alert(`Viewing clinical note: ${noteId}\nThis would display the complete clinical note in read-only mode.`);
    // In real application, this would open note viewer modal
}

function printClinicalNote(noteId) {
    alert(`Printing clinical note: ${noteId}\nOpening print dialog for clinical documentation.`);
    // In real application, this would generate printable version
}

function copyClinicalNote(noteId) {
    alert(`Creating copy of clinical note: ${noteId}\nThis would duplicate the note for new encounter.`);
    // In real application, this would create a copy for new documentation
}

function signClinicalNote(noteId) {
    if (confirm(`Are you sure you want to sign clinical note ${noteId}? This action cannot be undone.`)) {
        alert(`Clinical note ${noteId} signed successfully.\nNote is now complete and locked.`);
        // In real application, this would apply digital signature
    }
}

function editClinicalNote(noteId) {
    alert(`Editing clinical note: ${noteId}\nThis would open the note in edit mode.`);
    // In real application, this would open note editor
}

function cosignClinicalNote(noteId) {
    alert(`Cosigning clinical note: ${noteId}\nThis would apply cosignature as attending physician.`);
    // In real application, this would apply cosignature
}

function useTemplate(templateId) {
    const templateNames = {
        'soap_general': 'General SOAP Note',
        'progress_cardio': 'Cardiology Progress Note',
        'progress_endo': 'Endocrinology Progress Note',
        'admission_general': 'General Admission Note',
        'discharge_summary': 'Discharge Summary',
        'procedure_minor': 'Minor Procedure Note'
    };
    
    alert(`Using template: ${templateNames[templateId]}\nThis would load the template for new note creation.`);
    // In real application, this would load the selected template
}

function searchClinicalNotes() {
    const searchTerm = document.getElementById('clinicalNotesSearch').value.toLowerCase();
    const statusFilter = document.getElementById('noteStatusFilter').value;
    const typeFilter = document.getElementById('noteTypeFilter').value;
    
    const rows = document.querySelectorAll('#clinicalNotesTable tbody tr');
    let visibleCount = 0;
    
    rows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        const statusBadge = row.querySelector('.badge').textContent.toLowerCase();
        const noteType = row.cells[2].textContent.toLowerCase();
        
        const matchesSearch = !searchTerm || rowText.includes(searchTerm);
        const matchesStatus = !statusFilter || statusBadge.includes(statusFilter);
        const matchesType = !typeFilter || noteType.includes(typeFilter);
        
        if (matchesSearch && matchesStatus && matchesType) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    // Update visible count display
    const countDisplay = document.querySelector('#clinical-notes .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = `Showing ${visibleCount} of 156 notes`;
    }
}

function clearClinicalNotesFilters() {
    document.getElementById('clinicalNotesSearch').value = '';
    document.getElementById('noteStatusFilter').value = '';
    document.getElementById('noteTypeFilter').value = '';
    document.getElementById('notesStartDate').value = '';
    document.getElementById('notesEndDate').value = '';
    
    // Show all rows
    const rows = document.querySelectorAll('#clinicalNotesTable tbody tr');
    rows.forEach(row => {
        row.style.display = '';
    });
    
    // Reset count display
    const countDisplay = document.querySelector('#clinical-notes .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = 'Showing 1-8 of 156 notes';
    }
}

// Initialize clinical notes functionality
document.addEventListener('DOMContentLoaded', function() {
    const notesSearch = document.getElementById('clinicalNotesSearch');
    if (notesSearch) {
        notesSearch.addEventListener('input', searchClinicalNotes);
    }
    
    // Add event listeners to filter dropdowns
    const notesFilters = ['noteStatusFilter', 'noteTypeFilter'];
    notesFilters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', searchClinicalNotes);
        }
    });
    
    // Set default date range to last 30 days
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    
    document.getElementById('notesStartDate').value = startDate.toISOString().split('T')[0];
    document.getElementById('notesEndDate').value = endDate.toISOString().split('T')[0];
});

// medical-records.js

// Progress Notes Functions
function createDailyProgressNote() {
    alert('Opening Daily Progress Note template...');
    // Implementation would open a modal with daily progress note form
}

function createSurgeryProgressNote() {
    alert('Opening Post-Operative Progress Note template...');
}

function createICUProgressNote() {
    alert('Opening ICU Progress Note template...');
}

function createDischargeProgressNote() {
    alert('Opening Discharge Planning Progress Note template...');
}

function viewProgressNote(noteId) {
    alert(`Viewing progress note: ${noteId}`);
    // Implementation would open note viewer modal
}

function signProgressNote(noteId) {
    if (confirm(`Are you sure you want to sign progress note ${noteId}?`)) {
        alert(`Progress note ${noteId} signed successfully.`);
    }
}

function searchProgressNotes() {
    const searchTerm = document.getElementById('progressNotesSearch').value;
    // Implementation would filter progress notes table
    alert(`Searching progress notes for: ${searchTerm}`);
}

function clearProgressNotesFilters() {
    document.getElementById('progressNotesSearch').value = '';
    document.getElementById('progressNoteStatusFilter').value = '';
    document.getElementById('progressNoteDeptFilter').value = '';
    // Implementation would reset table display
}

// Medical History Functions
function loadMedicalHistory() {
    const patientSelect = document.getElementById('medicalHistoryPatient');
    const selectedPatient = patientSelect.value;
    alert(`Loading medical history for patient: ${selectedPatient}`);
    // Implementation would load patient's medical history data
}

function toggleHistoryView() {
    const viewMode = document.getElementById('historyViewMode').value;
    alert(`Switching to ${viewMode} view`);
    // Implementation would change the display mode
}

function addNewCondition() {
    alert('Opening form to add new medical condition...');
    // Implementation would open condition addition modal
}

function importExternalRecords() {
    alert('Opening external records import interface...');
}

function generateHistoryReport() {
    alert('Generating comprehensive medical history report...');
}

// Initialize Medical Records functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize progress notes search
    const progressSearch = document.getElementById('progressNotesSearch');
    if (progressSearch) {
        progressSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchProgressNotes();
            }
        });
    }

    // Set default dates for progress notes
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7); // Last 7 days
    
    if (document.getElementById('progressNotesStartDate')) {
        document.getElementById('progressNotesStartDate').value = startDate.toISOString().split('T')[0];
        document.getElementById('progressNotesEndDate').value = endDate.toISOString().split('T')[0];
    }
});

// Enhanced medical-records.js

// Medical History Functions
function quickHistoryOverview() {
    alert('Opening comprehensive health timeline view...');
    // Implementation would show interactive timeline
}

function filterHistoryByTime() {
    const timeRange = document.getElementById('historyTimeRange').value;
    alert(`Filtering medical history for: ${timeRange}`);
    // Implementation would filter all historical data
}

function compareFamilyHistory() {
    alert('Opening family history comparison tool...');
    // Implementation would show genetic risk analysis
}

function addNewMedication() {
    alert('Opening medication addition form...');
    // Implementation would open medication modal
}

// Surgical History Functions
function addSurgicalProcedure() {
    alert('Opening surgical procedure documentation form...');
    // Implementation would open surgical procedure modal
}

// Progress Notes Enhanced Functions
function useProgressTemplate(templateId) {
    const templates = {
        'daily_general': 'General Daily Progress Note',
        'post_op': 'Post-Operative Progress Note',
        'icu_daily': 'ICU Daily Progress Note'
    };
    
    alert(`Loading template: ${templates[templateId]}`);
    // Implementation would load the selected template
}
// Initialize enhanced functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize surgical history date sorting
    const surgicalTable = document.querySelector('#surgical-list table');
    if (surgicalTable) {
        // Add sorting functionality
        initializeTableSorting(surgicalTable);
    }

    // Set default time range for medical history
    const timeRange = document.getElementById('historyTimeRange');
    if (timeRange) {
        timeRange.value = 'all'; // Default to all time
    }
});

function initializeTableSorting(table) {
    // Implementation for table sorting functionality
    console.log('Table sorting initialized for:', table);
}

/* ========= Pharmacy Dashboard Charts ========= */
let pharmacyCharts = {};

function initializePharmacyCharts() {
    // Prescription Volume Chart (Line Chart)
    const prescriptionCtx = document.getElementById('prescriptionVolumeChart').getContext('2d');
    pharmacyCharts.prescriptionVolume = new Chart(prescriptionCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'],
            datasets: [{
                label: 'Prescriptions Filled',
                data: [45, 52, 38, 61, 55, 48, 35, 58, 62, 45, 51, 49, 42, 37, 60, 55, 48, 52, 58, 44, 39, 56, 61, 47, 53, 59, 41, 36, 54, 57],
                borderColor: '#0ea5e9',
                backgroundColor: 'rgba(14, 165, 233, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#0ea5e9',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 4
            }, {
                label: 'New Prescriptions',
                data: [28, 35, 22, 40, 32, 25, 18, 38, 42, 28, 33, 30, 25, 20, 38, 32, 28, 35, 40, 26, 22, 36, 41, 29, 34, 39, 24, 19, 35, 37],
                borderColor: '#14b8a6',
                backgroundColor: 'rgba(20, 184, 166, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#14b8a6',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: 'var(--text-color)',
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'var(--card-bg)',
                    titleColor: 'var(--text-color)',
                    bodyColor: 'var(--text-color)',
                    borderColor: 'var(--border-color)',
                    borderWidth: 1,
                    cornerRadius: 8
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'var(--border-color)'
                    },
                    ticks: {
                        color: 'var(--text-muted)'
                    }
                },
                y: {
                    grid: {
                        color: 'var(--border-color)'
                    },
                    ticks: {
                        color: 'var(--text-muted)'
                    },
                    beginAtZero: true
                }
            }
        }
    });

    // Prescription Status Chart (Doughnut)
    const statusCtx = document.getElementById('prescriptionStatusChart').getContext('2d');
    pharmacyCharts.prescriptionStatus = new Chart(statusCtx, {
        type: 'doughnut',
        data: {
            labels: ['Dispensed', 'Pending Verification', 'Ready for Pickup', 'Insurance Pending', 'On Hold'],
            datasets: [{
                data: [65, 15, 8, 7, 5],
                backgroundColor: [
                    '#10b981',
                    '#f59e0b',
                    '#0ea5e9',
                    '#8b5cf6',
                    '#ef4444'
                ],
                // borderColor: 'var(--card-bg)',
                borderWidth: 3,
                hoverOffset: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: 'var(--text-color)',
                        font: {
                            size: 11
                        },
                        padding: 15
                    }
                },
                tooltip: {
                    backgroundColor: 'var(--card-bg)',
                    titleColor: 'var(--text-color)',
                    bodyColor: 'var(--text-color)',
                    // borderColor: 'var(--border-color)',
                    borderWidth: 1
                }
            }
        }
    });

    // Drug Categories Chart (Pie)
    const categoriesCtx = document.getElementById('drugCategoriesChart').getContext('2d');
    pharmacyCharts.drugCategories = new Chart(categoriesCtx, {
        type: 'pie',
        data: {
            labels: ['Antibiotics', 'Cardiovascular', 'Diabetes', 'Pain Management', 'Mental Health', 'Other'],
            datasets: [{
                data: [25, 20, 15, 18, 12, 10],
                backgroundColor: [
                    '#0ea5e9',
                    '#ef4444',
                    '#10b981',
                    '#f59e0b',
                    '#8b5cf6',
                    '#64748b'
                ],
                // borderColor: 'var(--card-bg)',
                borderWidth: 3,
                hoverOffset: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: 'var(--text-color)',
                        font: {
                            size: 11
                        },
                        padding: 15
                    }
                },
                tooltip: {
                    backgroundColor: 'var(--card-bg)',
                    titleColor: 'var(--text-color)',
                    bodyColor: 'var(--text-color)',
                    // borderColor: 'var(--border-color)',
                    borderWidth: 1
                }
            }
        }
    });

    // Inventory Levels Chart (Bar)
    const inventoryCtx = document.getElementById('inventoryLevelsChart').getContext('2d');
    pharmacyCharts.inventoryLevels = new Chart(inventoryCtx, {
        type: 'bar',
        data: {
            labels: ['Antibiotics', 'Cardiac', 'Diabetes', 'Pain Relief', 'Respiratory', 'Vitamins'],
            datasets: [{
                label: 'Current Stock',
                data: [85, 92, 45, 78, 65, 88],
                backgroundColor: [
                    '#0ea5e9',
                    '#ef4444',
                    '#10b981',
                    '#f59e0b',
                    '#8b5cf6',
                    '#64748b'
                ],
                // borderColor: 'var(--card-bg)',
                borderWidth: 2,
                borderRadius: 6,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'var(--card-bg)',
                    titleColor: 'var(--text-color)',
                    bodyColor: 'var(--text-color)',
                    // borderColor: 'var(--border-color)',
                    borderWidth: 1
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: 'var(--text-muted)'
                    }
                },
                y: {
                    grid: {
                        color: 'var(--border-color)'
                    },
                    ticks: {
                        color: 'var(--text-muted)',
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    // Top Medications Chart (Horizontal Bar)
    const topMedsCtx = document.getElementById('topMedicationsChart').getContext('2d');
    pharmacyCharts.topMedications = new Chart(topMedsCtx, {
        type: 'bar',
        data: {
            labels: ['Lisinopril', 'Metformin', 'Atorvastatin', 'Amoxicillin', 'Levothyroxine'],
            datasets: [{
                label: 'Prescriptions This Month',
                data: [245, 198, 156, 142, 128],
                backgroundColor: 'rgba(14, 165, 233, 0.8)',
                borderColor: '#0ea5e9',
                borderWidth: 2,
                borderRadius: 4,
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'var(--card-bg)',
                    titleColor: 'var(--text-color)',
                    bodyColor: 'var(--text-color)',
                    borderColor: 'var(--border-color)',
                    borderWidth: 1
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'var(--border-color)'
                    },
                    ticks: {
                        color: 'var(--text-muted)'
                    },
                    beginAtZero: true
                },
                y: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: 'var(--text-color)'
                    }
                }
            }
        }
    });
}

function updatePrescriptionChart() {
    const range = document.getElementById('prescriptionChartRange').value;
    // Simulate data update based on range
    const newData = range === '7d' ? 
        [45, 52, 38, 61, 55, 48, 35] : 
        range === '30d' ?
        [45, 52, 38, 61, 55, 48, 35, 58, 62, 45, 51, 49, 42, 37, 60, 55, 48, 52, 58, 44, 39, 56, 61, 47, 53, 59, 41, 36, 54, 57] :
        [45, 52, 38, 61, 55, 48, 35, 58, 62, 45, 51, 49, 42, 37, 60, 55, 48, 52, 58, 44, 39, 56, 61, 47, 53, 59, 41, 36, 54, 57, 45, 52, 38, 61, 55, 48, 35, 58, 62, 45, 51, 49, 42, 37, 60, 55, 48, 52, 58, 44, 39, 56, 61, 47, 53, 59, 41, 36, 54, 57, 45, 52, 38, 61, 55, 48, 35, 58, 62, 45, 51, 49, 42, 37, 60, 55, 48, 52, 58, 44, 39, 56, 61, 47, 53, 59, 41, 36, 54, 57];
    
    const newLabels = range === '7d' ? 
        ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] : 
        range === '30d' ?
        Array.from({length: 30}, (_, i) => `Day ${i + 1}`) :
        Array.from({length: 90}, (_, i) => `Day ${i + 1}`);
    
    pharmacyCharts.prescriptionVolume.data.labels = newLabels;
    pharmacyCharts.prescriptionVolume.data.datasets[0].data = newData;
    pharmacyCharts.prescriptionVolume.update();
}

function refreshCharts() {
    // Simulate refreshing chart data with slight variations
    Object.values(pharmacyCharts).forEach(chart => {
        if (chart.data.datasets) {
            chart.data.datasets.forEach(dataset => {
                if (Array.isArray(dataset.data)) {
                    dataset.data = dataset.data.map(value => {
                        const variation = Math.random() * 10 - 5; // -5 to +5 variation
                        return Math.max(0, Math.round(value + variation));
                    });
                }
            });
            chart.update();
        }
    });
    alert('Charts refreshed with latest data!');
}

function downloadChart(chartId) {
    const chart = pharmacyCharts[chartId.replace('Chart', '')];
    if (chart) {
        const link = document.createElement('a');
        link.download = `${chartId}-${new Date().toISOString().split('T')[0]}.png`;
        link.href = chart.toBase64Image();
        link.click();
    }
}

function exportDashboardReport() {
    alert('Exporting comprehensive pharmacy dashboard report...\nThis would generate a PDF with all charts and data.');
    // In real application, this would generate a comprehensive PDF report
}

// Initialize charts when dashboard is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the dashboard page
    if (document.getElementById('dashboard')?.classList.contains('active')) {
        // Load Chart.js library dynamically
        loadChartJS();
    }
});

function loadChartJS() {
    if (typeof Chart === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = initializePharmacyCharts;
        document.head.appendChild(script);
    } else {
        initializePharmacyCharts();
    }
}

// Reinitialize charts when switching to dashboard
const originalPageSwitch = document.querySelectorAll('.sidebar-menu a');
originalPageSwitch.forEach(link => {
    link.addEventListener('click', function() {
        const pageId = this.getAttribute('data-page');
        if (pageId === 'dashboard') {
            setTimeout(() => {
                if (typeof Chart !== 'undefined' && !pharmacyCharts.prescriptionVolume) {
                    initializePharmacyCharts();
                }
            }, 100);
        }
    });
});

const input  = document.getElementById('medicationInput');
  const select = document.getElementById('medicationSelect');
  const hidden = document.getElementById('medicationHidden');

  // Allowed values (from datalist)
  const allowed = new Set(
    Array.from(document.querySelectorAll('#MedicationList option')).map(o => o.value)
  );

  function setValue(v) {
    input.value = v || '';
    select.value = v || '';
    hidden.value = v || '';
  }

  // Keep in sync both ways
  input.addEventListener('change',  () => setValue(input.value));
  select.addEventListener('change', () => setValue(select.value));

  // Basic validation: require a value and ensure it matches the list
  function validate() {
    if (!input.value) { input.setCustomValidity('Please choose a medication'); return; }
    input.setCustomValidity(allowed.has(input.value) ? '' : 'Please pick a medication from the list');
  }
  input.addEventListener('input', () => { input.setCustomValidity(''); });
  input.addEventListener('blur',  validate);

  // Initialize if you want a placeholder selection
  setValue('');

  /* ========= Drug Dispensary Functions ========= */
function processNextInQueue() {
    alert('Processing next prescription in queue...\nOpening dispensing interface for #RX-5012');
    // In real application, this would open the dispensing modal for the next prescription
}

function checkInteractions() {
    alert('Opening drug interaction checker...\nThis would check all pending prescriptions for potential interactions.');
    // In real application, this would run interaction checks
}

function batchDispensing() {
    alert('Opening batch dispensing mode...\nThis would allow processing multiple prescriptions efficiently.');
    // In real application, this would enable batch processing
}

function generateDispensingReport() {
    alert('Generating daily dispensing report...\nThis would create a comprehensive report of all dispensing activities.');
    // In real application, this would generate reports
}

function verifyPrescription(rxId) {
    alert(`Verifying prescription: ${rxId}\nThis would open verification interface with drug details and patient information.`);
    // In real application, this would open verification modal
}

function viewRxDetails(rxId) {
    alert(`Viewing prescription details: ${rxId}\nThis would show complete prescription information.`);
    // In real application, this would open prescription detail view
}

function checkInsurance(rxId) {
    alert(`Checking insurance coverage for: ${rxId}\nThis would verify insurance benefits and coverage.`);
    // In real application, this would check insurance system
}

function contactPatient(rxId) {
    alert(`Contacting patient for prescription: ${rxId}\nThis would open patient communication interface.`);
    // In real application, this would open messaging/phone interface
}

function dispenseMedication(rxId) {
    alert(`Dispensing medication for: ${rxId}\nThis would open dispensing workflow with barcode scanning.`);
    // In real application, this would start dispensing process
}

function reviewInteraction(rxId) {
    alert(`Reviewing drug interaction for: ${rxId}\nThis would show detailed interaction analysis.`);
    // In real application, this would open interaction review
}

function contactMD(rxId) {
    alert(`Contacting prescribing physician for: ${rxId}\nThis would open communication with the doctor.`);
    // In real application, this would contact the prescribing MD
}

function confirmPickup(rxId) {
    if (confirm(`Confirm pickup for prescription ${rxId}? This will mark the prescription as completed.`)) {
        alert(`Prescription ${rxId} pickup confirmed!\nTransaction completed successfully.`);
        // In real application, this would complete the dispensing process
    }
}

// Initialize dispensing functionality
document.addEventListener('DOMContentLoaded', function() {
    const dispenseBtn = document.getElementById('dispenseMedicationBtn');
    if (dispenseBtn) {
        dispenseBtn.addEventListener('click', function() {
            alert('Opening new medication dispensing interface...');
            // In real application, this would open dispensing modal
        });
    }
});

/* ========= Prescription Tracker Functions ========= */
function searchPrescription() {
    alert('Opening prescription search interface...\nSearch by ID, patient, or medication.');
    // In real application, this would open advanced search modal
}

function checkRefillDue() {
    alert('Checking refill due prescriptions...\n42 prescriptions due for refill in next 7 days.');
    // In real application, this would filter and show due prescriptions
}

function adherenceReport() {
    alert('Generating adherence compliance report...\nOverall adherence rate: 89%.');
    // In real application, this would generate detailed adherence reports
}

function expirationAlert() {
    alert('Checking prescription expirations...\n18 prescriptions expiring within 30 days.');
    // In real application, this would show expiration alerts
}

function viewRxTracking(rxId) {
    alert(`Viewing detailed tracking for prescription: ${rxId}\nThis would show complete prescription history and tracking data.`);
    // In real application, this would open detailed tracking view
}

function refillRequest(rxId) {
    alert(`Initiating refill request for: ${rxId}\nThis would start the refill authorization process.`);
    // In real application, this would initiate refill workflow
}

function contactPatientRx(rxId) {
    alert(`Contacting patient for prescription: ${rxId}\nThis would open patient communication options.`);
    // In real application, this would open contact interface
}

function processRefill(rxId) {
    alert(`Processing refill for: ${rxId}\nThis would move prescription to dispensing queue.`);
    // In real application, this would process the refill
}

function sendReminder(rxId) {
    alert(`Sending refill reminder for: ${rxId}\nReminder sent via SMS and email.`);
    // In real application, this would send automated reminders
}

function contactMDRefill(rxId) {
    alert(`Contacting physician for refill authorization: ${rxId}\nThis would request new prescription from doctor.`);
    // In real application, this would contact prescribing physician
}

function renewPrescription(rxId) {
    alert(`Renewing expired prescription: ${rxId}\nThis would initiate prescription renewal process.`);
    // In real application, this would start renewal workflow
}

function counselPatient(rxId) {
    alert(`Initiating patient counseling for: ${rxId}\nThis would open counseling session for adherence issues.`);
    // In real application, this would start counseling process
}

function adherenceSupport(rxId) {
    alert(`Providing adherence support for: ${rxId}\nThis would offer adherence tools and resources.`);
    // In real application, this would provide support resources
}

function searchTrackingPrescriptions() {
    const searchTerm = document.getElementById('prescriptionSearch').value.toLowerCase();
    const statusFilter = document.getElementById('trackingStatusFilter').value;
    const typeFilter = document.getElementById('medicationTypeFilter').value;
    
    const rows = document.querySelectorAll('#prescriptionTrackingTable tbody tr');
    let visibleCount = 0;
    
    rows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        const statusBadge = row.querySelector('.badge').textContent.toLowerCase();
        const medicationCell = row.cells[2].textContent.toLowerCase();
        
        const matchesSearch = !searchTerm || rowText.includes(searchTerm);
        const matchesStatus = !statusFilter || statusBadge.includes(statusFilter);
        const matchesType = !typeFilter || medicationCell.includes(typeFilter);
        
        if (matchesSearch && matchesStatus && matchesType) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    // Update visible count display
    const countDisplay = document.querySelector('#prescription-tracker .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = `Showing ${visibleCount} of 1,248 prescriptions`;
    }
}

function clearTrackingFilters() {
    document.getElementById('prescriptionSearch').value = '';
    document.getElementById('trackingStatusFilter').value = '';
    document.getElementById('medicationTypeFilter').value = '';
    document.getElementById('trackingStartDate').value = '';
    document.getElementById('trackingEndDate').value = '';
    
    // Show all rows
    const rows = document.querySelectorAll('#prescriptionTrackingTable tbody tr');
    rows.forEach(row => {
        row.style.display = '';
    });
    
    // Reset count display
    const countDisplay = document.querySelector('#prescription-tracker .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = 'Showing 1-8 of 1,248 prescriptions';
    }
}

// Initialize tracking functionality
document.addEventListener('DOMContentLoaded', function() {
    const trackBtn = document.getElementById('trackNewRxBtn');
    if (trackBtn) {
        trackBtn.addEventListener('click', function() {
            alert('Opening prescription tracking interface...');
            // In real application, this would open tracking modal
        });
    }

    const searchInput = document.getElementById('prescriptionSearch');
    if (searchInput) {
        searchInput.addEventListener('input', searchTrackingPrescriptions);
    }
    
    // Set default date range to last 30 days
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    
    document.getElementById('trackingStartDate').value = startDate.toISOString().split('T')[0];
    document.getElementById('trackingEndDate').value = endDate.toISOString().split('T')[0];
});

/* ========= Drug Interactions Functions ========= */
function checkQuickInteraction() {
    const med1 = document.getElementById('primaryMed').value;
    const med2 = document.getElementById('secondaryMed').value;
    
    if (!med1 || !med2) {
        alert('Please enter both medications to check for interactions.');
        return;
    }
    
    alert(`Checking interaction between:\n${med1}\nand\n${med2}\n\nThis would perform real-time interaction analysis.`);
    // In real application, this would call interaction checking API
}

function patientProfileCheck() {
    alert('Opening patient profile interaction checker...\nThis would analyze complete medication regimen for a patient.');
    // In real application, this would open patient selection modal
}

function drugClassInteractions() {
    alert('Opening drug class interaction analyzer...\nThis would check interactions between therapeutic classes.');
    // In real application, this would open class-based interaction tool
}

function foodInteractions() {
    alert('Opening food and herbal interaction checker...\nThis would analyze dietary and supplement interactions.');
    // In real application, this would open food interaction database
}

function diseaseInteractions() {
    alert('Opening disease state interaction checker...\nThis would check medication contraindications based on patient conditions.');
    // In real application, this would open disease-based interaction tool
}

function reviewInteractionAlert(alertId) {
    alert(`Reviewing interaction alert: ${alertId}\nThis would open detailed interaction analysis with evidence and recommendations.`);
    // In real application, this would open interaction review modal
}

function contactMDInteraction(alertId) {
    alert(`Contacting physician for interaction alert: ${alertId}\nThis would open communication interface with prescribing doctor.`);
    // In real application, this would contact the prescribing physician
}

function suggestAlternative(alertId) {
    alert(`Suggesting alternatives for interaction: ${alertId}\nThis would provide safe alternative medication options.`);
    // In real application, this would show alternative medications
}

function holdPrescription(alertId) {
    if (confirm('Hold prescription due to contraindicated interaction? This will prevent dispensing until resolved.')) {
        alert(`Prescription held for interaction alert: ${alertId}\nPatient and physician notified.`);
        // In real application, this would place prescription on hold
    }
}

function emergencyContact(alertId) {
    alert(`Initiating emergency contact for critical interaction: ${alertId}\nThis would immediately contact patient and healthcare team.`);
    // In real application, this would trigger emergency protocols
}

function viewInteractionDetails(alertId) {
    alert(`Viewing detailed interaction information: ${alertId}\nThis would show mechanism, evidence, and management strategies.`);
    // In real application, this would show detailed interaction data
}

function counselTiming(alertId) {
    alert(`Providing timing counseling for interaction: ${alertId}\nThis would explain proper administration timing to avoid interactions.`);
    // In real application, this would provide counseling guidelines
}

function documentInteraction(alertId) {
    alert(`Documenting interaction resolution: ${alertId}\nThis would record the interaction review and actions taken.`);
    // In real application, this would document in patient record
}

function counselHerbal(alertId) {
    alert(`Providing herbal supplement counseling: ${alertId}\nThis would educate about herbal medication interactions.`);
    // In real application, this would provide herbal interaction education
}

function monitorSymptoms(alertId) {
    alert(`Setting up symptom monitoring for interaction: ${alertId}\nThis would establish monitoring plan for potential adverse effects.`);
    // In real application, this would create monitoring schedule
}

function openDrugsDatabase() {
    alert('Opening Drugs.com interaction database...\nThis would redirect to comprehensive online interaction checker.');
    // In real application, this would open external database
}

function openMicromedex() {
    alert('Opening Micromedex evidence database...\nThis would access evidence-based interaction information.');
    // In real application, this would open Micromedex
}

function openLexicomp() {
    alert('Opening Lexicomp clinical resources...\nThis would access clinical decision support tools.');
    // In real application, this would open Lexicomp
}

// Initialize interaction checker
document.addEventListener('DOMContentLoaded', function() {
    const checkBtn = document.getElementById('checkInteractionsBtn');
    if (checkBtn) {
        checkBtn.addEventListener('click', function() {
            alert('Opening comprehensive interaction checker...\nSelect patient or enter medications to check.');
            // In real application, this would open main interaction checker
        });
    }

    // Add Enter key functionality for quick check
    const primaryMed = document.getElementById('primaryMed');
    const secondaryMed = document.getElementById('secondaryMed');
    
    if (primaryMed && secondaryMed) {
        primaryMed.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                secondaryMed.focus();
            }
        });
        
        secondaryMed.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkQuickInteraction();
            }
        });
    }
});

/* ========= Drug Dispensary Functions ========= */
function processNextInQueue() {
    alert('Processing next prescription in queue...\nOpening dispensing interface for #RX-5012');
}

function checkInteractions() {
    alert('Opening drug interaction checker...\nThis would check all pending prescriptions for potential interactions.');
}

function batchDispensing() {
    alert('Opening batch dispensing mode...\nThis would allow processing multiple prescriptions efficiently.');
}

function generateDispensingReport() {
    alert('Generating daily dispensing report...\nThis would create a comprehensive report of all dispensing activities.');
}

function verifyPrescription(rxId) {
    alert(`Verifying prescription: ${rxId}\nThis would open verification interface with drug details and patient information.`);
}

function viewRxDetails(rxId) {
    alert(`Viewing prescription details: ${rxId}\nThis would show complete prescription information.`);
}

function checkInsurance(rxId) {
    alert(`Checking insurance coverage for: ${rxId}\nThis would verify insurance benefits and coverage.`);
}

function contactPatient(rxId) {
    alert(`Contacting patient for prescription: ${rxId}\nThis would open patient communication interface.`);
}

function dispenseMedication(rxId) {
    alert(`Dispensing medication for: ${rxId}\nThis would open dispensing workflow with barcode scanning.`);
}

function reviewInteraction(rxId) {
    alert(`Reviewing drug interaction for: ${rxId}\nThis would show detailed interaction analysis.`);
}

function contactMD(rxId) {
    alert(`Contacting prescribing physician for: ${rxId}\nThis would open communication with the doctor.`);
}

function confirmPickup(rxId) {
    if (confirm(`Confirm pickup for prescription ${rxId}? This will mark the prescription as completed.`)) {
        alert(`Prescription ${rxId} pickup confirmed!\nTransaction completed successfully.`);
    }
}

/* ========= Prescription Tracker Functions ========= */
function searchPrescription() {
    alert('Opening prescription search interface...\nSearch by ID, patient, or medication.');
}

function checkRefillDue() {
    alert('Checking refill due prescriptions...\n42 prescriptions due for refill in next 7 days.');
}

function adherenceReport() {
    alert('Generating adherence compliance report...\nOverall adherence rate: 89%.');
}

function expirationAlert() {
    alert('Checking prescription expirations...\n18 prescriptions expiring within 30 days.');
}

function viewRxTracking(rxId) {
    alert(`Viewing detailed tracking for prescription: ${rxId}\nThis would show complete prescription history and tracking data.`);
}

function refillRequest(rxId) {
    alert(`Initiating refill request for: ${rxId}\nThis would start the refill authorization process.`);
}

function contactPatientRx(rxId) {
    alert(`Contacting patient for prescription: ${rxId}\nThis would open patient communication options.`);
}

function processRefill(rxId) {
    alert(`Processing refill for: ${rxId}\nThis would move prescription to dispensing queue.`);
}

function sendReminder(rxId) {
    alert(`Sending refill reminder for: ${rxId}\nReminder sent via SMS and email.`);
}

function contactMDRefill(rxId) {
    alert(`Contacting physician for refill authorization: ${rxId}\nThis would request new prescription from doctor.`);
}

function renewPrescription(rxId) {
    alert(`Renewing expired prescription: ${rxId}\nThis would initiate prescription renewal process.`);
}

function counselPatient(rxId) {
    alert(`Initiating patient counseling for: ${rxId}\nThis would open counseling session for adherence issues.`);
}

function adherenceSupport(rxId) {
    alert(`Providing adherence support for: ${rxId}\nThis would offer adherence tools and resources.`);
}

function searchTrackingPrescriptions() {
    const searchTerm = document.getElementById('prescriptionSearch')?.value.toLowerCase() || '';
    const statusFilter = document.getElementById('trackingStatusFilter')?.value || '';
    const typeFilter = document.getElementById('medicationTypeFilter')?.value || '';
    
    const rows = document.querySelectorAll('#prescriptionTrackingTable tbody tr');
    let visibleCount = 0;
    
    rows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        const statusBadge = row.querySelector('.badge')?.textContent.toLowerCase() || '';
        const medicationCell = row.cells[2]?.textContent.toLowerCase() || '';
        
        const matchesSearch = !searchTerm || rowText.includes(searchTerm);
        const matchesStatus = !statusFilter || statusBadge.includes(statusFilter);
        const matchesType = !typeFilter || medicationCell.includes(typeFilter);
        
        if (matchesSearch && matchesStatus && matchesType) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
}

function clearTrackingFilters() {
    const searchInput = document.getElementById('prescriptionSearch');
    const statusFilter = document.getElementById('trackingStatusFilter');
    const typeFilter = document.getElementById('medicationTypeFilter');
    
    if (searchInput) searchInput.value = '';
    if (statusFilter) statusFilter.value = '';
    if (typeFilter) typeFilter.value = '';
    
    const rows = document.querySelectorAll('#prescriptionTrackingTable tbody tr');
    rows.forEach(row => {
        row.style.display = '';
    });
}

/* ========= Drug Interactions Functions ========= */
function checkQuickInteraction() {
    const med1 = document.getElementById('primaryMed')?.value || '';
    const med2 = document.getElementById('secondaryMed')?.value || '';
    
    if (!med1 || !med2) {
        alert('Please enter both medications to check for interactions.');
        return;
    }
    
    alert(`Checking interaction between:\n${med1}\nand\n${med2}\n\nThis would perform real-time interaction analysis.`);
}

function patientProfileCheck() {
    alert('Opening patient profile interaction checker...\nThis would analyze complete medication regimen for a patient.');
}

function drugClassInteractions() {
    alert('Opening drug class interaction analyzer...\nThis would check interactions between therapeutic classes.');
}

function foodInteractions() {
    alert('Opening food and herbal interaction checker...\nThis would analyze dietary and supplement interactions.');
}

function diseaseInteractions() {
    alert('Opening disease state interaction checker...\nThis would check medication contraindications based on patient conditions.');
}

function reviewInteractionAlert(alertId) {
    alert(`Reviewing interaction alert: ${alertId}\nThis would open detailed interaction analysis with evidence and recommendations.`);
}

function contactMDInteraction(alertId) {
    alert(`Contacting physician for interaction alert: ${alertId}\nThis would open communication interface with prescribing doctor.`);
}

function suggestAlternative(alertId) {
    alert(`Suggesting alternatives for interaction: ${alertId}\nThis would provide safe alternative medication options.`);
}

function holdPrescription(alertId) {
    if (confirm('Hold prescription due to contraindicated interaction? This will prevent dispensing until resolved.')) {
        alert(`Prescription held for interaction alert: ${null}\nPatient and physician notified.`);
    }
}

function emergencyContact(alertId) {
    alert(`Initiating emergency contact for critical interaction: ${alertId}\nThis would immediately contact patient and healthcare team.`);
}

function viewInteractionDetails(alertId) {
    alert(`Viewing detailed interaction information: ${alertId}\nThis would show mechanism, evidence, and management strategies.`);
}

function counselTiming(alertId) {
    alert(`Providing timing counseling for interaction: ${alertId}\nThis would explain proper administration timing to avoid interactions.`);
}

function documentInteraction(alertId) {
    alert(`Documenting interaction resolution: ${alertId}\nThis would record the interaction review and actions taken.`);
}

function counselHerbal(alertId) {
    alert(`Providing herbal supplement counseling: ${alertId}\nThis would educate about herbal medication interactions.`);
}

function monitorSymptoms(alertId) {
    alert(`Setting up symptom monitoring for interaction: ${alertId}\nThis would establish monitoring plan for potential adverse effects.`);
}

function openDrugsDatabase() {
    alert('Opening Drugs.com interaction database...\nThis would redirect to comprehensive online interaction checker.');
}

function openMicromedex() {
    alert('Opening Micromedex evidence database...\nThis would access evidence-based interaction information.');
}

function openLexicomp() {
    alert('Opening Lexicomp clinical resources...\nThis would access clinical decision support tools.');
}

/* ========= Expiry Management Functions ========= */
function viewCriticalExpiries() {
    alert('Opening critical expiry list...\nShowing 8 medications expiring within 7 days.');
}

function generateReturnList() {
    alert('Generating vendor return list...\nThis would create a comprehensive list for supplier returns.');
}

function initiateStockRotation() {
    alert('Initiating stock rotation procedure...\nThis would enforce FIFO (First-In-First-Out) inventory management.');
}

function expiryAnalytics() {
    alert('Opening expiry analytics dashboard...\nThis would show trends and patterns in medication expiry.');
}

function initiateReturn(batchId) {
    alert(`Initiating return process for batch: ${batchId}\nThis would start the supplier return procedure.`);
}

function transferStock(batchId) {
    alert(`Transferring stock for batch: ${batchId}\nThis would move stock to higher usage areas.`);
}

function discardMedication(batchId) {
    if (confirm(`Are you sure you want to discard this medication? This action cannot be undone and will result in financial loss.`)) {
        alert(`Medication discarded for batch: ${batchId}\nProper disposal procedure initiated.`);
    }
}

function prioritizeUsage(batchId) {
    alert(`Prioritizing usage for batch: ${batchId}\nThis medication will be dispensed first to prevent expiry.`);
}

function contactSupplier(batchId) {
    alert(`Contacting supplier for batch: ${batchId}\nThis would open communication for return or exchange.`);
}

function updateForecast(batchId) {
    alert(`Updating usage forecast for batch: ${batchId}\nThis would adjust ordering patterns to prevent future expiry.`);
}

function adjustOrdering(batchId) {
    alert(`Adjusting ordering parameters for batch: ${batchId}\nThis would modify reorder points and quantities.`);
}

function setAlert(batchId) {
    alert(`Setting expiry alert for batch: ${batchId}\nNotifications will be sent before expiry.`);
}

function viewUsage(batchId) {
    alert(`Viewing usage patterns for batch: ${batchId}\nThis would show consumption rates and trends.`);
}

function reviewStock(batchId) {
    alert(`Reviewing stock levels for batch: ${batchId}\nThis would analyze current inventory and usage.`);
}

function planRotation(batchId) {
    alert(`Planning stock rotation for batch: ${batchId}\nThis would create rotation schedule.`);
}

function documentStatus(batchId) {
    alert(`Documenting status for batch: ${batchId}\nThis would record current status and actions taken.`);
}

function searchExpiryItems() {
    const searchTerm = document.getElementById('expirySearch')?.value.toLowerCase() || '';
    const timelineFilter = document.getElementById('expiryTimelineFilter')?.value || '';
    const categoryFilter = document.getElementById('expiryCategoryFilter')?.value || '';
    const costFilter = document.getElementById('costThresholdFilter')?.value || '';
    
    const rows = document.querySelectorAll('#expiryManagementTable tbody tr');
    let visibleCount = 0;
    
    rows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        const daysCell = row.cells[4]?.textContent.toLowerCase() || '';
        const categoryCell = row.cells[0]?.textContent.toLowerCase() || '';
        const costCell = row.cells[5]?.textContent.toLowerCase() || '';
        
        const matchesSearch = !searchTerm || rowText.includes(searchTerm);
        const matchesTimeline = !timelineFilter || daysCell.includes(timelineFilter);
        const matchesCategory = !categoryFilter || categoryCell.includes(categoryFilter);
        const matchesCost = !costFilter || (
            (costFilter === 'high' && costCell.includes('000 TSH')) ||
            (costFilter === 'medium' && costCell.includes('000 TSH')) ||
            (costFilter === 'low' && !costCell.includes('000 TSH'))
        );
        
        if (matchesSearch && matchesTimeline && matchesCategory && matchesCost) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
}

function clearExpiryFilters() {
    const searchInput = document.getElementById('expirySearch');
    const timelineFilter = document.getElementById('expiryTimelineFilter');
    const categoryFilter = document.getElementById('expiryCategoryFilter');
    const costFilter = document.getElementById('costThresholdFilter');
    
    if (searchInput) searchInput.value = '';
    if (timelineFilter) timelineFilter.value = '';
    if (categoryFilter) categoryFilter.value = '';
    if (costFilter) costFilter.value = '';
    
    const rows = document.querySelectorAll('#expiryManagementTable tbody tr');
    rows.forEach(row => {
        row.style.display = '';
    });
}

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Drug Dispensary initialization
    const dispenseBtn = document.getElementById('dispenseMedicationBtn');
    if (dispenseBtn) {
        dispenseBtn.addEventListener('click', function() {
            alert('Opening new medication dispensing interface...');
        });
    }

    // Prescription Tracker initialization
    const trackBtn = document.getElementById('trackNewRxBtn');
    if (trackBtn) {
        trackBtn.addEventListener('click', function() {
            alert('Opening prescription tracking interface...');
        });
    }

    const prescriptionSearch = document.getElementById('prescriptionSearch');
    if (prescriptionSearch) {
        prescriptionSearch.addEventListener('input', searchTrackingPrescriptions);
    }

    // Drug Interactions initialization
    const checkBtn = document.getElementById('checkInteractionsBtn');
    if (checkBtn) {
        checkBtn.addEventListener('click', function() {
            alert('Opening comprehensive interaction checker...\nSelect patient or enter medications to check.');
        });
    }

    // Expiry Management initialization
    const reportBtn = document.getElementById('generateExpiryReportBtn');
    if (reportBtn) {
        reportBtn.addEventListener('click', function() {
            alert('Generating comprehensive expiry report...\nThis would create a PDF with all expiry data and recommendations.');
        });
    }

    const expirySearch = document.getElementById('expirySearch');
    if (expirySearch) {
        expirySearch.addEventListener('input', searchExpiryItems);
    }
});

/* ========= Prescription Orders Functions ========= */
function verifyPendingPrescriptions() {
    alert('Opening pending prescriptions verification dashboard...');
    // Implementation would show all pending prescriptions for batch verification
}

function processBatchOrders() {
    alert('Opening batch order processing interface...');
    // Implementation would allow processing multiple orders at once
}

function checkDrugInteractions() {
    alert('Opening drug interaction checker...');
    // Implementation would check for potential drug interactions
}

function generatePrescriptionReport() {
    alert('Generating prescription orders report...');
    // Implementation would generate comprehensive report
}

function viewPrescriptionOrder(orderId) {
    alert(`Viewing prescription order: ${orderId}\nThis would show detailed prescription information.`);
    // Implementation would open prescription detail modal
}

function verifyPrescription(orderId) {
    if (confirm(`Are you sure you want to verify prescription ${orderId}?`)) {
        alert(`Prescription ${orderId} verified successfully.\nOrder moved to ready for dispensing.`);
        // Implementation would update prescription status
    }
}

function editPrescription(orderId) {
    alert(`Editing prescription: ${orderId}\nThis would open prescription edit form.`);
    // Implementation would open edit modal
}

function dispensePrescription(orderId) {
    alert(`Dispensing prescription: ${orderId}\nOpening dispensing interface.`);
    // Implementation would open dispensing modal
}

function printPrescription(orderId) {
    alert(`Printing prescription: ${orderId}\nOpening print dialog.`);
    // Implementation would generate printable prescription
}

function checkInteractions(orderId) {
    alert(`Checking drug interactions for: ${orderId}\nOpening interaction analysis.`);
    // Implementation would check for drug interactions
}

function reprintLabel(orderId) {
    alert(`Reprinting label for: ${orderId}\nGenerating new medication label.`);
    // Implementation would reprint medication label
}

function refillPrescription(orderId) {
    alert(`Processing refill for: ${orderId}\nOpening refill authorization.`);
    // Implementation would process prescription refill
}

function contactPatient(orderId) {
    alert(`Contacting patient for: ${orderId}\nOpening patient communication interface.`);
    // Implementation would open patient contact options
}

function searchPrescriptions() {
    const searchTerm = document.getElementById('prescriptionSearch').value.toLowerCase();
    const statusFilter = document.getElementById('orderStatusFilter').value;
    const priorityFilter = document.getElementById('priorityFilter').value;
    
    const rows = document.querySelectorAll('#prescriptionOrdersTable tbody tr');
    let visibleCount = 0;
    
    rows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        const statusBadge = row.querySelector('.badge').textContent.toLowerCase();
        const priorityBadge = row.cells[5].querySelector('.badge').textContent.toLowerCase();
        
        const matchesSearch = !searchTerm || rowText.includes(searchTerm);
        const matchesStatus = !statusFilter || statusBadge.includes(statusFilter);
        const matchesPriority = !priorityFilter || priorityBadge.includes(priorityFilter);
        
        if (matchesSearch && matchesStatus && matchesPriority) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    // Update visible count display
    const countDisplay = document.querySelector('#pharmacy-orders .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = `Showing ${visibleCount} of 156 orders`;
    }
}

function clearPrescriptionFilters() {
    document.getElementById('prescriptionSearch').value = '';
    document.getElementById('orderStatusFilter').value = '';
    document.getElementById('priorityFilter').value = '';
    document.getElementById('prescriptionStartDate').value = '';
    document.getElementById('prescriptionEndDate').value = '';
    
    // Show all rows
    const rows = document.querySelectorAll('#prescriptionOrdersTable tbody tr');
    rows.forEach(row => {
        row.style.display = '';
    });
    
    // Reset count display
    const countDisplay = document.querySelector('#pharmacy-orders .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = 'Showing 1-10 of 156 orders';
    }
}

function loadPrescriptionDetails() {
    const selectedPrescription = document.getElementById('selectedPrescription').value;
    if (selectedPrescription) {
        // In real application, this would load prescription details
        alert(`Loading details for prescription: ${selectedPrescription}`);
    }
}

function clearProcessingForm() {
    document.getElementById('selectedPrescription').value = '';
    document.getElementById('processingAction').value = 'verify';
    document.getElementById('pharmacistNotes').value = '';
}

function processPrescriptionAction() {
    const prescription = document.getElementById('selectedPrescription').value;
    const action = document.getElementById('processingAction').value;
    const notes = document.getElementById('pharmacistNotes').value;
    
    if (!prescription) {
        alert('Please select a prescription to process.');
        return;
    }
    
    alert(`Processing action: ${action} for prescription ${prescription}\nNotes: ${notes}`);
    clearProcessingForm();
}

// Initialize prescription orders functionality
document.addEventListener('DOMContentLoaded', function() {
    const prescriptionSearch = document.getElementById('prescriptionSearch');
    if (prescriptionSearch) {
        prescriptionSearch.addEventListener('input', searchPrescriptions);
    }
    
    // Add event listeners to filter dropdowns
    const prescriptionFilters = ['orderStatusFilter', 'priorityFilter'];
    prescriptionFilters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', searchPrescriptions);
        }
    });
    
    // Set default dates to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('prescriptionStartDate').value = today;
    document.getElementById('prescriptionEndDate').value = today;
    
    // Add event listener for new prescription order button
    const newPrescriptionOrderBtn = document.getElementById('newPrescriptionOrderBtn');
    if (newPrescriptionOrderBtn) {
        newPrescriptionOrderBtn.addEventListener('click', function() {
            // Open the existing prescription modal
            document.getElementById('prescriptionModal').style.display = 'flex';
        });
    }
});

/* ========= Billing & Invoicing Functions ========= */
function quickGenerateInvoice() {
    alert('Opening quick invoice generator...');
    // Implementation would open a simplified invoice creation interface
}

function processBatchPayments() {
    alert('Opening batch payment processor...');
    // Implementation would allow processing multiple payments at once
}

function generateInsuranceClaims() {
    alert('Generating insurance claims batch...');
    // Implementation would process multiple insurance claims
}

function runBillingReports() {
    alert('Generating billing reports...');
    // Implementation would generate financial reports
}

function viewInvoice(invoiceId) {
    alert(`Viewing invoice: ${invoiceId}\nThis would show detailed invoice view.`);
    // Implementation would open invoice detail modal
}

function printInvoice(invoiceId) {
    alert(`Printing invoice: ${invoiceId}\nOpening print dialog...`);
    // Implementation would generate printable invoice
}

function emailInvoice(invoiceId) {
    alert(`Emailing invoice: ${invoiceId}\nThis would open email composer.`);
    // Implementation would integrate with email system
}

function processPayment(invoiceId) {
    alert(`Processing payment for: ${invoiceId}\nThis would open payment processing form.`);
    // Implementation would open payment modal
}

function sendReminder(invoiceId) {
    alert(`Sending payment reminder for: ${invoiceId}\nReminder sent via SMS and email.`);
    // Implementation would send automated reminders
}

function sendFinalNotice(invoiceId) {
    alert(`Sending final notice for: ${invoiceId}\nFinal notice sent to patient.`);
    // Implementation would send final payment demand
}

function applyPartialPayment(invoiceId) {
    alert(`Applying partial payment for: ${invoiceId}\nOpening partial payment form.`);
    // Implementation would handle partial payments
}

function setupPaymentPlan(invoiceId) {
    alert(`Setting up payment plan for: ${invoiceId}\nOpening payment plan setup.`);
    // Implementation would create installment plans
}

function recordPayment(invoiceId) {
    alert(`Recording manual payment for: ${invoiceId}\nOpening payment recording form.`);
    // Implementation would record offline payments
}

function searchBills() {
    const searchTerm = document.getElementById('billingSearch').value.toLowerCase();
    const statusFilter = document.getElementById('billingStatusFilter').value;
    const methodFilter = document.getElementById('paymentMethodFilter').value;
    
    const rows = document.querySelectorAll('#billingTable tbody tr');
    let visibleCount = 0;
    
    rows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        const statusBadge = row.querySelector('.badge').textContent.toLowerCase();
        const insuranceCell = row.cells[5].textContent.toLowerCase();
        
        const matchesSearch = !searchTerm || rowText.includes(searchTerm);
        const matchesStatus = !statusFilter || statusBadge.includes(statusFilter);
        const matchesMethod = !methodFilter || insuranceCell.includes(methodFilter);
        
        if (matchesSearch && matchesStatus && matchesMethod) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    // Update visible count display
    const countDisplay = document.querySelector('#billing .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = `Showing ${visibleCount} of 156 invoices`;
    }
}

function clearBillingFilters() {
    document.getElementById('billingSearch').value = '';
    document.getElementById('billingStatusFilter').value = '';
    document.getElementById('paymentMethodFilter').value = '';
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
    
    // Show all rows
    const rows = document.querySelectorAll('#billingTable tbody tr');
    rows.forEach(row => {
        row.style.display = '';
    });
    
    // Reset count display
    const countDisplay = document.querySelector('#billing .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = 'Showing 1-8 of 156 invoices';
    }
}

function loadInvoiceDetails() {
    const selectedInvoice = document.getElementById('selectedInvoice').value;
    if (selectedInvoice) {
        // In real application, this would load invoice details and auto-fill amount
        const invoiceAmounts = {
            'INV-2346': 187500,
            'INV-2347': 1245800,
            'INV-2348': 456200,
            'INV-2349': 785600
        };
        
        const amount = invoiceAmounts[selectedInvoice];
        if (amount) {
            document.getElementById('paymentAmount').value = amount;
        }
        document.getElementById('paymentDate').value = new Date().toISOString().split('T')[0];
    }
}

function clearPaymentForm() {
    document.getElementById('selectedInvoice').value = '';
    document.getElementById('paymentAmount').value = '';
    document.getElementById('paymentMethod').value = '';
    document.getElementById('paymentDate').value = '';
    document.getElementById('paymentReference').value = '';
    document.getElementById('paymentNotes').value = '';
}

function processSinglePayment() {
    const invoice = document.getElementById('selectedInvoice').value;
    const amount = document.getElementById('paymentAmount').value;
    const method = document.getElementById('paymentMethod').value;
    const date = document.getElementById('paymentDate').value;
    
    if (!invoice || !amount || !method || !date) {
        alert('Please fill in all required payment fields.');
        return;
    }
    
    if (amount <= 0) {
        alert('Please enter a valid payment amount.');
        return;
    }
    
    alert(`Payment processed successfully!\nInvoice: ${invoice}\nAmount: ${Number(amount).toLocaleString()} TSH\nMethod: ${method}\nDate: ${date}`);
    clearPaymentForm();
}

// Initialize billing functionality
document.addEventListener('DOMContentLoaded', function() {
    const billingSearch = document.getElementById('billingSearch');
    if (billingSearch) {
        billingSearch.addEventListener('input', searchBills);
    }
    
    // Add event listeners to billing filter dropdowns
    const billingFilters = ['billingStatusFilter', 'paymentMethodFilter'];
    billingFilters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', searchBills);
        }
    });
    
    // Set default payment date to today
    const paymentDate = document.getElementById('paymentDate');
    if (paymentDate) {
        paymentDate.value = new Date().toISOString().split('T')[0];
    }
    
    // Set default date range to last 30 days
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    
    document.getElementById('startDate').value = startDate.toISOString().split('T')[0];
    document.getElementById('endDate').value = endDate.toISOString().split('T')[0];
    
    // Add event listener for generate invoice button
    const generateInvoiceBtn = document.getElementById('generateInvoiceBtn');
    if (generateInvoiceBtn) {
        generateInvoiceBtn.addEventListener('click', function() {
            document.getElementById('invoiceModal').style.display = 'flex';
        });
    }
});

/* ========= Insurance Processing Functions ========= */
function submitNewClaim() {
    alert('Opening new claim submission form...');
    // Implementation would open claim submission modal
}

function batchSubmitClaims() {
    alert('Opening batch claims submission...');
    // Implementation would open batch processing interface
}

function trackClaimsStatus() {
    alert('Opening claims tracking dashboard...');
    // Implementation would show real-time tracking
}

function generateClaimsReport() {
    alert('Generating insurance claims report...');
    // Implementation would generate comprehensive reports
}

function viewClaimDetails(claimId) {
    alert(`Viewing claim details: ${claimId}\nThis would show detailed claim information.`);
    // Implementation would open claim detail modal
}

function trackClaim(claimId) {
    alert(`Tracking claim: ${claimId}\nThis would show claim status and timeline.`);
    // Implementation would show tracking information
}

function downloadClaim(claimId) {
    alert(`Downloading claim documents: ${claimId}\nPreparing download package...`);
    // Implementation would generate downloadable claim package
}

function submitAdditionalDocs(claimId) {
    alert(`Submitting additional documents for: ${claimId}\nOpening document upload form.`);
    // Implementation would open document upload interface
}

function resubmitClaim(claimId) {
    alert(`Resubmitting claim: ${claimId}\nThis would open claim correction form.`);
    // Implementation would allow claim resubmission
}

function appealClaim(claimId) {
    alert(`Initiating appeal for: ${claimId}\nStarting appeals process.`);
    // Implementation would start formal appeal procedure
}

function contactInsurer(claimId) {
    alert(`Contacting insurer for: ${claimId}\nThis would open communication interface.`);
    // Implementation would integrate with communication system
}

function downloadEOB(claimId) {
    alert(`Downloading EOB for: ${claimId}\nExplanation of Benefits document.`);
    // Implementation would download EOB document
}

function archiveClaim(claimId) {
    alert(`Archiving claim: ${claimId}\nClaim moved to archives.`);
    // Implementation would archive completed claims
}

function searchClaims() {
    const searchTerm = document.getElementById('claimsSearch').value.toLowerCase();
    const statusFilter = document.getElementById('claimStatusFilter').value;
    const providerFilter = document.getElementById('insuranceProviderFilter').value;
    
    const rows = document.querySelectorAll('#claimsTable tbody tr');
    let visibleCount = 0;
    
    rows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        const statusBadge = row.querySelector('.badge').textContent.toLowerCase();
        const providerCell = row.cells[2].textContent.toLowerCase();
        
        const matchesSearch = !searchTerm || rowText.includes(searchTerm);
        const matchesStatus = !statusFilter || statusBadge.includes(statusFilter);
        const matchesProvider = !providerFilter || providerCell.includes(providerFilter);
        
        if (matchesSearch && matchesStatus && matchesProvider) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    // Update visible count display
    const countDisplay = document.querySelector('#insurance-processing .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = `Showing ${visibleCount} of 156 claims`;
    }
}

function clearClaimsFilters() {
    document.getElementById('claimsSearch').value = '';
    document.getElementById('claimStatusFilter').value = '';
    document.getElementById('insuranceProviderFilter').value = '';
    document.getElementById('claimsStartDate').value = '';
    document.getElementById('claimsEndDate').value = '';
    
    // Show all rows
    const rows = document.querySelectorAll('#claimsTable tbody tr');
    rows.forEach(row => {
        row.style.display = '';
    });
    
    // Reset count display
    const countDisplay = document.querySelector('#insurance-processing .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = 'Showing 1-8 of 156 claims';
    }
}

function loadPatientInsurance() {
    const patientSelect = document.getElementById('claimPatient');
    const selectedPatient = patientSelect.value;
    
    if (selectedPatient) {
        // In real application, this would load patient's insurance details from database
        const insuranceData = {
            'P-1001': { provider: 'NHIF', policy: 'NH-234567', coverage: '80%' },
            'P-1002': { provider: 'MediSquare', policy: 'ML-987654', coverage: '75%' },
            'P-1003': { provider: 'Blue Cross', policy: 'BC-456123', coverage: '80%' },
            'P-1004': { provider: 'Aetna', policy: 'AE-789012', coverage: '80%' }
        };
        
        const data = insuranceData[selectedPatient];
        if (data) {
            document.getElementById('claimInsuranceProvider').value = data.provider;
            document.getElementById('claimPolicyNumber').value = data.policy;
            document.getElementById('claimExpectedCoverage').value = data.coverage;
            
            // Calculate amounts based on coverage
            calculateClaimAmounts();
        }
    }
}

function calculateClaimAmounts() {
    // Calculate total from selected services
    let totalAmount = 0;
    const services = [
        { id: 'service1', amount: 45000 },
        { id: 'service2', amount: 85000 },
        { id: 'service3', amount: 65000 },
        { id: 'service4', amount: 50750 },
        { id: 'service5', amount: 150000 }
    ];
    
    services.forEach(service => {
        const checkbox = document.getElementById(service.id);
        if (checkbox && checkbox.checked) {
            totalAmount += service.amount;
        }
    });
    
    // Update amounts
    const coverage = document.getElementById('claimExpectedCoverage').value;
    const coveragePercent = parseInt(coverage) / 100;
    const coveredAmount = totalAmount * coveragePercent;
    const patientResponsibility = totalAmount - coveredAmount;
    
    document.getElementById('claimTotalAmount').value = totalAmount.toLocaleString() + ' TSH';
    document.getElementById('claimPatientResponsibility').value = patientResponsibility.toLocaleString() + ' TSH';
}

function clearClaimForm() {
    document.getElementById('claimPatient').value = '';
    document.getElementById('claimServiceDate').value = '';
    document.getElementById('claimInsuranceProvider').value = '';
    document.getElementById('claimPolicyNumber').value = '';
    document.getElementById('claimGroupNumber').value = '';
    document.getElementById('claimClinicalNotes').value = '';
    document.getElementById('claimDocuments').value = '';
    
    // Uncheck all service checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Reset amounts
    document.getElementById('claimTotalAmount').value = '0 TSH';
    document.getElementById('claimPatientResponsibility').value = '0 TSH';
}

function submitClaim() {
    const patient = document.getElementById('claimPatient').value;
    const serviceDate = document.getElementById('claimServiceDate').value;
    const totalAmount = document.getElementById('claimTotalAmount').value;
    
    if (!patient || !serviceDate || totalAmount === '0 TSH') {
        alert('Please fill in all required fields and select at least one service.');
        return;
    }
    
    alert(`Insurance claim submitted successfully!\nPatient: ${patient}\nTotal Amount: ${totalAmount}\nStatus: Submitted for processing`);
    clearClaimForm();
}

// Initialize insurance processing functionality
document.addEventListener('DOMContentLoaded', function() {
    const claimsSearch = document.getElementById('claimsSearch');
    if (claimsSearch) {
        claimsSearch.addEventListener('input', searchClaims);
    }
    
    // Add event listeners to claims filter dropdowns
    const claimsFilters = ['claimStatusFilter', 'insuranceProviderFilter'];
    claimsFilters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', searchClaims);
        }
    });
    
    // Set default service date to today
    const serviceDate = document.getElementById('claimServiceDate');
    if (serviceDate) {
        serviceDate.value = new Date().toISOString().split('T')[0];
    }
    
    // Set default date range to last 30 days
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    
    document.getElementById('claimsStartDate').value = startDate.toISOString().split('T')[0];
    document.getElementById('claimsEndDate').value = endDate.toISOString().split('T')[0];
    
    // Add event listeners to service checkboxes for real-time calculation
    const serviceCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    serviceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateClaimAmounts);
    });
    
    // Bind the submit new claim button
    const submitNewClaimBtn = document.getElementById('submitNewClaimBtn');
    if (submitNewClaimBtn) {
        submitNewClaimBtn.addEventListener('click', function() {
            // This could open a modal or navigate to a detailed form
            alert('Opening detailed claim submission form...');
        });
    }
});

/* ========= Payment Tracking Functions ========= */
function quickRecordPayment() {
    alert('Opening quick payment recording form...');
    // In real application, this would open payment recording modal
}

function processBatchPayments() {
    alert('Opening batch payment processor...');
    // In real application, this would open batch processing interface
}

function generatePaymentReport() {
    alert('Generating payment collection report...');
    // In real application, this would generate comprehensive reports
}

function sendPaymentReminders() {
    alert('Sending payment reminders to patients with overdue invoices...');
    // In real application, this would send automated reminders
}

function viewPaymentDetails(paymentId) {
    alert(`Viewing payment details: ${paymentId}\nThis would show detailed payment information.`);
    // In real application, this would open payment detail modal
}

function printReceipt(paymentId) {
    alert(`Printing receipt for payment: ${paymentId}\nOpening print dialog.`);
    // In real application, this would generate printable receipt
}

function refundPayment(paymentId) {
    if (confirm(`Are you sure you want to process a refund for payment ${paymentId}?`)) {
        alert(`Refund initiated for payment: ${paymentId}\nThis would open refund processing form.`);
        // In real application, this would open refund modal
    }
}

function verifyPayment(paymentId) {
    alert(`Verifying pending payment: ${paymentId}\nMarking as completed.`);
    // In real application, this would update payment status
}

function emailReceipt(paymentId) {
    alert(`Emailing receipt for payment: ${paymentId}\nThis would open email composer.`);
    // In real application, this would integrate with email system
}

function retryPayment(paymentId) {
    alert(`Retrying failed payment: ${paymentId}\nThis would attempt payment processing again.`);
    // In real application, this would retry the payment
}

function contactPatient(paymentId) {
    alert(`Contacting patient for payment: ${paymentId}\nThis would open patient communication interface.`);
    // In real application, this would open communication modal
}

function searchPayments() {
    const searchTerm = document.getElementById('paymentSearch').value.toLowerCase();
    const statusFilter = document.getElementById('paymentStatusFilter').value;
    const methodFilter = document.getElementById('paymentMethodFilter').value;
    
    const rows = document.querySelectorAll('#paymentsTable tbody tr');
    let visibleCount = 0;
    
    rows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        const statusBadge = row.querySelector('.badge').textContent.toLowerCase();
        const methodCell = row.cells[4].textContent.toLowerCase();
        
        const matchesSearch = !searchTerm || rowText.includes(searchTerm);
        const matchesStatus = !statusFilter || statusBadge.includes(statusFilter);
        const matchesMethod = !methodFilter || methodCell.includes(methodFilter);
        
        if (matchesSearch && matchesStatus && matchesMethod) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    // Update visible count display
    const countDisplay = document.querySelector('#payment-tracking .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = `Showing ${visibleCount} of 245 payments`;
    }
}

function clearPaymentFilters() {
    document.getElementById('paymentSearch').value = '';
    document.getElementById('paymentStatusFilter').value = '';
    document.getElementById('paymentMethodFilter').value = '';
    document.getElementById('paymentStartDate').value = '';
    document.getElementById('paymentEndDate').value = '';
    
    // Show all rows
    const rows = document.querySelectorAll('#paymentsTable tbody tr');
    rows.forEach(row => {
        row.style.display = '';
    });
    
    // Reset count display
    const countDisplay = document.querySelector('#payment-tracking .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = 'Showing 1-8 of 245 payments';
    }
}

// Initialize payment tracking functionality
document.addEventListener('DOMContentLoaded', function() {
    const paymentSearch = document.getElementById('paymentSearch');
    if (paymentSearch) {
        paymentSearch.addEventListener('input', searchPayments);
    }
    
    // Add event listeners to payment filter dropdowns
    const paymentFilters = ['paymentStatusFilter', 'paymentMethodFilter'];
    paymentFilters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', searchPayments);
        }
    });
    
    // Set default date range to last 30 days
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    
    if (document.getElementById('paymentStartDate')) {
        document.getElementById('paymentStartDate').value = startDate.toISOString().split('T')[0];
        document.getElementById('paymentEndDate').value = endDate.toISOString().split('T')[0];
    }
    
    // Add modal trigger for record payment button
    const recordPaymentBtn = document.getElementById('recordPaymentBtn');
    if (recordPaymentBtn) {
        recordPaymentBtn.addEventListener('click', function() {
            // In real application, this would open the payment recording modal
            alert('Opening payment recording form...');
        });
    }
});

/* ========= Payment Tracking Charts ========= */
function initializePaymentCharts() {
    // Payment Methods Distribution Chart (Doughnut)
    const paymentMethodsCtx = document.getElementById('paymentMethodsChart');
    
    if (paymentMethodsCtx) {
        new Chart(paymentMethodsCtx, {
            type: 'doughnut',
            data: {
                labels: ['Insurance', 'Cash', 'Card', 'Bank Transfer', 'Mobile'],
                datasets: [{
                    data: [42, 28, 18, 8, 4],
                    backgroundColor: [
                        '#0ea5e9',  // Insurance - Blue
                        '#10b981',  // Cash - Green
                        '#f59e0b',  // Card - Yellow
                        '#8b5cf6',  // Bank Transfer - Purple
                        '#ef4444'   // Mobile - Red
                    ],
                    borderWidth: 3,
                    hoverOffset: 15
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '60%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: 'var(--text-color)',
                            font: {
                                size: 11
                            },
                            padding: 15,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        backgroundColor: 'var(--card-bg)',
                        titleColor: 'var(--text-color)',
                        bodyColor: 'var(--text-color)',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.parsed}%`;
                            }
                        }
                    }
                }
            }
        });
    }
}

// Update your existing chart loading function
function initializeAllCharts() {
    // Your existing pharmacy charts
    if (document.getElementById('prescriptionVolumeChart')) {
        initializePharmacyCharts();
    }
    
    // Payment tracking charts
    if (document.getElementById('paymentMethodsChart')) {
        initializePaymentCharts();
    }
}

// Make sure Chart.js is loaded
function loadChartJS() {
    if (typeof Chart === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = initializeAllCharts;
        document.head.appendChild(script);
    } else {
        initializeAllCharts();
    }
}

// Initialize when payment tracking page is active
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('payment-tracking')?.classList.contains('active')) {
        loadChartJS();
    }
});

// Also initialize when switching to payment tracking page
const sidebarLinks = document.querySelectorAll('.sidebar-menu a, .dropdown-menu a');
sidebarLinks.forEach(link => {
    link.addEventListener('click', function() {
        const pageId = this.getAttribute('data-page');
        if (pageId === 'payment-tracking') {
            setTimeout(() => {
                if (typeof Chart !== 'undefined') {
                    initializePaymentCharts();
                } else {
                    loadChartJS();
                }
            }, 100);
        }
    });
});

/* ========= Financial Reports Functions ========= */
function generateFinancialReport() {
    const reportType = document.getElementById('reportType').value;
    const dateRange = document.getElementById('reportDateRange').value;
    const format = document.getElementById('reportFormat').value;
    
    if (!reportType) {
        alert('Please select a report type.');
        return;
    }
    
    // Show loading state
    const generateBtn = document.querySelector('button[onclick="generateFinancialReport()"]');
    const originalText = generateBtn.innerHTML;
    generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    generateBtn.disabled = true;
    
    // Simulate report generation
    setTimeout(() => {
        alert(`Financial report generated successfully!\nType: ${reportType}\nFormat: ${format.toUpperCase()}\nDate Range: ${dateRange}`);
        generateBtn.innerHTML = originalText;
        generateBtn.disabled = false;
    }, 2000);
}

function clearReportForm() {
    document.getElementById('reportType').value = '';
    document.getElementById('reportDateRange').value = 'last-quarter';
    document.getElementById('reportFormat').value = 'pdf';
    document.getElementById('includeCharts').checked = true;
    document.getElementById('includeDetails').checked = true;
    document.getElementById('includeComparisons').checked = false;
    document.getElementById('departmentFilter').value = 'all';
    document.getElementById('customDateRange').style.display = 'none';
}

function quickMonthlyFinancials() {
    document.getElementById('reportType').value = 'income-statement';
    document.getElementById('reportDateRange').value = 'last-month';
    document.getElementById('reportFormat').value = 'pdf';
    alert('Monthly Profit & Loss template loaded. Click Generate Report to proceed.');
}

function quickRevenueReport() {
    document.getElementById('reportType').value = 'revenue-breakdown';
    document.getElementById('reportDateRange').value = 'last-quarter';
    document.getElementById('reportFormat').value = 'excel';
    alert('Revenue Analysis template loaded. Click Generate Report to proceed.');
}

function quickExpenseReport() {
    document.getElementById('reportType').value = 'expense-analysis';
    document.getElementById('reportDateRange').value = 'last-quarter';
    document.getElementById('reportFormat').value = 'pdf';
    alert('Expense Report template loaded. Click Generate Report to proceed.');
}

function quickCollectionReport() {
    document.getElementById('reportType').value = 'collection-analysis';
    document.getElementById('reportDateRange').value = 'last-month';
    document.getElementById('reportFormat').value = 'excel';
    alert('Collection Report template loaded. Click Generate Report to proceed.');
}

function viewReport(reportId) {
    alert(`Viewing report: ${reportId}\nThis would open the report in a preview mode.`);
}

function downloadReport(reportId) {
    alert(`Downloading report: ${reportId}\nThis would download the report file.`);
}

function shareReport(reportId) {
    alert(`Sharing report: ${reportId}\nThis would open sharing options.`);
}

/* ========= Financial Charts ========= */
function initializeFinancialCharts() {
    // Revenue vs Expenses Chart (Line Chart)
    const revenueExpensesCtx = document.getElementById('revenueExpensesChart');
    if (revenueExpensesCtx) {
        new Chart(revenueExpensesCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                datasets: [{
                    label: 'Revenue',
                    data: [22.5, 24.8, 23.2, 26.1, 28.4, 25.9, 27.3, 29.1, 26.8, 28.5],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Expenses',
                    data: [18.2, 19.5, 17.8, 20.3, 21.6, 19.9, 20.8, 22.1, 20.5, 21.8],
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: 'var(--text-color)'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed}M TSH`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            callback: function(value) {
                                return value + 'M TSH';
                            }
                        }
                    }
                }
            }
        });
    }

    // Revenue by Department Chart (Bar Chart)
    const revenueByDeptCtx = document.getElementById('revenueByDeptChart');
    if (revenueByDeptCtx) {
        new Chart(revenueByDeptCtx, {
            type: 'bar',
            data: {
                labels: ['Cardiology', 'Orthopedics', 'Surgery', 'Emergency', 'Pediatrics', 'Other'],
                datasets: [{
                    label: 'Revenue (M TSH)',
                    data: [68.4, 43.6, 38.2, 41.3, 38.8, 15.3],
                    backgroundColor: [
                        '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#64748b'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // Profit Margin Chart (Line Chart)
    const profitMarginCtx = document.getElementById('profitMarginChart');
    if (profitMarginCtx) {
        new Chart(profitMarginCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                datasets: [{
                    label: 'Profit Margin %',
                    data: [18.5, 20.2, 19.8, 21.5, 22.8, 21.2, 22.5, 23.1, 21.8, 23.8],
                    borderColor: '#8b5cf6',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    // Collection Chart (Line Chart)
    const collectionCtx = document.getElementById('collectionChart');
    if (collectionCtx) {
        new Chart(collectionCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                datasets: [{
                    label: 'Collection Rate %',
                    data: [89.2, 91.5, 90.8, 92.3, 93.6, 92.9, 93.8, 94.1, 93.5, 94.5],
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        min: 85,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    // Expense Breakdown Chart (Doughnut)
    const expenseBreakdownCtx = document.getElementById('expenseBreakdownChart');
    if (expenseBreakdownCtx) {
        new Chart(expenseBreakdownCtx, {
            type: 'doughnut',
            data: {
                labels: ['Staff Salaries', 'Medications', 'Equipment', 'Utilities', 'Administration', 'Other'],
                datasets: [{
                    data: [45, 25, 12, 8, 6, 4],
                    backgroundColor: [
                        '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#64748b'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '60%',
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

function updateFinancialCharts() {
    const timeRange = document.getElementById('chartTimeRange').value;
    alert(`Updating financial charts for: ${timeRange}\nThis would reload chart data with the selected time range.`);
    // In real application, this would fetch new data and update all charts
}

// Initialize financial reports functionality
document.addEventListener('DOMContentLoaded', function() {
    // Show/hide custom date range
    const dateRangeSelect = document.getElementById('reportDateRange');
    if (dateRangeSelect) {
        dateRangeSelect.addEventListener('change', function() {
            const customRange = document.getElementById('customDateRange');
            if (this.value === 'custom') {
                customRange.style.display = 'flex';
            } else {
                customRange.style.display = 'none';
            }
        });
    }

    // Set default dates for custom range
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);
    
    if (document.getElementById('reportStartDate')) {
        document.getElementById('reportStartDate').value = oneMonthAgo.toISOString().split('T')[0];
        document.getElementById('reportEndDate').value = today.toISOString().split('T')[0];
    }

    // Initialize charts if on financial reports page
    if (document.getElementById('financial-reports')?.classList.contains('active')) {
        if (typeof Chart !== 'undefined') {
            initializeFinancialCharts();
        } else {
            loadChartJS();
        }
    }
});

// Update your existing loadChartJS function to include financial charts
function loadChartJS() {
    if (typeof Chart === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = function() {
            if (document.getElementById('prescriptionVolumeChart')) {
                initializePharmacyCharts();
            }
            if (document.getElementById('paymentMethodsChart')) {
                initializePaymentCharts();
            }
            if (document.getElementById('revenueExpensesChart')) {
                initializeFinancialCharts();
            }
        };
        document.head.appendChild(script);
    } else {
        if (document.getElementById('revenueExpensesChart')) {
            initializeFinancialCharts();
        }
    }
}

/* ========= Revenue Cycle Management Functions ========= */
function runCycleAnalysis() {
    alert('Running comprehensive revenue cycle analysis...\nThis would analyze all aspects of the revenue cycle.');
}

function runClaimsAnalysis() {
    alert('Running claims submission analysis...\nIdentifying bottlenecks and submission patterns.');
}

function runDenialAnalysis() {
    alert('Running denial pattern analysis...\nIdentifying root causes and trends in claim denials.');
}

function runAgingAnalysis() {
    alert('Running accounts receivable aging analysis...\nAnalyzing collection performance and aging buckets.');
}

function runProviderAnalysis() {
    alert('Running provider performance analysis...\nReviewing coding accuracy and documentation quality.');
}

function submitClaim(claimId) {
    alert(`Submitting claim: ${claimId}\nThis would process the claim submission.`);
}

function viewClaim(claimId) {
    alert(`Viewing claim details: ${claimId}\nThis would show complete claim information.`);
}

function completeReview(claimId) {
    alert(`Completing review for claim: ${claimId}\nMarking as ready for submission.`);
}

function escalateClaim(claimId) {
    alert(`Escalating claim: ${claimId}\nThis would escalate to a supervisor for review.`);
}

function holdClaim(claimId) {
    if (confirm(`Are you sure you want to place claim ${claimId} on hold?`)) {
        alert(`Claim ${claimId} placed on hold.\nThis would temporarily suspend processing.`);
    }
}

function resubmitClaim(claimId) {
    alert(`Resubmitting denied claim: ${claimId}\nThis would correct and resubmit the claim.`);
}

function appealClaim(claimId) {
    alert(`Initiating appeal for claim: ${claimId}\nThis would start the formal appeals process.`);
}

function correctCoding(claimId) {
    alert(`Correcting coding for claim: ${claimId}\nThis would open coding correction interface.`);
}

function writeOffClaim(claimId) {
    if (confirm(`Are you sure you want to write off claim ${claimId}? This action cannot be undone.`)) {
        alert(`Claim ${claimId} written off.\nThis would remove from accounts receivable.`);
    }
}

/* ========= Revenue Cycle Charts ========= */
function initializeRevenueCycleCharts() {
    // Claim Status Distribution Chart (Doughnut)
    const claimStatusCtx = document.getElementById('claimStatusChart');
    if (claimStatusCtx) {
        new Chart(claimStatusCtx, {
            type: 'doughnut',
            data: {
                labels: ['Paid', 'Pending', 'Denied', 'Under Review', 'Awaiting Submission'],
                datasets: [{
                    data: [65, 18, 5, 8, 4],
                    backgroundColor: [
                        '#10b981', // Paid - Green
                        '#f59e0b', // Pending - Yellow
                        '#ef4444', // Denied - Red
                        '#0ea5e9', // Under Review - Blue
                        '#64748b'  // Awaiting Submission - Gray
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '60%',
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Denial Reasons Chart (Bar)
    const denialReasonsCtx = document.getElementById('denialReasonsChart');
    if (denialReasonsCtx) {
        new Chart(denialReasonsCtx, {
            type: 'bar',
            data: {
                labels: ['Authorization', 'Invalid Coding', 'Duplicate', 'Eligibility', 'Timely Filing'],
                datasets: [{
                    label: 'Number of Denials',
                    data: [42, 28, 15, 8, 7],
                    backgroundColor: '#ef4444'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // Revenue Cycle Timeline Chart (Line)
    const cycleTimelineCtx = document.getElementById('cycleTimelineChart');
    if (cycleTimelineCtx) {
        new Chart(cycleTimelineCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                datasets: [{
                    label: 'Average Collection Days',
                    data: [22.5, 21.8, 20.3, 19.7, 19.2, 18.8, 18.5, 18.3, 18.2, 18.2],
                    borderColor: '#0ea5e9',
                    backgroundColor: 'rgba(14, 165, 233, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'Days'
                        }
                    }
                }
            }
        });
    }

    // AR Aging Chart (Bar)
    const arAgingCtx = document.getElementById('arAgingChart');
    if (arAgingCtx) {
        new Chart(arAgingCtx, {
            type: 'bar',
            data: {
                labels: ['0-30 days', '31-60 days', '61-90 days', '91-120 days', '120+ days'],
                datasets: [{
                    label: 'Amount (M TSH)',
                    data: [156.8, 45.2, 22.1, 12.5, 8.4],
                    backgroundColor: [
                        '#10b981',
                        '#f59e0b',
                        '#f97316',
                        '#ef4444',
                        '#7f1d1d'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // Clean Claim Rate Chart (Line)
    const cleanClaimCtx = document.getElementById('cleanClaimChart');
    if (cleanClaimCtx) {
        new Chart(cleanClaimCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                datasets: [{
                    label: 'Clean Claim Rate %',
                    data: [89.2, 90.5, 91.8, 92.3, 93.1, 93.6, 93.9, 94.2, 94.4, 94.5],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        min: 85,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    // Payer Performance Chart (Bar)
    const payerPerformanceCtx = document.getElementById('payerPerformanceChart');
    if (payerPerformanceCtx) {
        new Chart(payerPerformanceCtx, {
            type: 'bar',
            data: {
                labels: ['NHIF', 'MediSquare', 'Blue Cross', 'Aetna', 'Self-Pay'],
                datasets: [{
                    label: 'Collection Rate %',
                    data: [96.2, 94.8, 92.3, 90.7, 85.4],
                    backgroundColor: '#0ea5e9'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        min: 80,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }
}

function updateRevenueCycleCharts() {
    const timeRange = document.getElementById('cycleTimeRange').value;
    alert(`Updating revenue cycle charts for: ${timeRange}\nThis would reload all charts with the selected time range.`);
    // In real application, this would fetch new data and update all charts
}

// Initialize revenue cycle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tab functionality
    const tabs = document.querySelectorAll('#revenue-cycle .tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            const container = this.closest('.card-body');
            
            // Remove active class from all tabs
            container.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');

            // Hide all tab contents
            container.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            // Show selected tab content
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Initialize charts if on revenue cycle page
    if (document.getElementById('revenue-cycle')?.classList.contains('active')) {
        if (typeof Chart !== 'undefined') {
            initializeRevenueCycleCharts();
        } else {
            loadChartJS();
        }
    }
});

// Update your existing loadChartJS function to include revenue cycle charts
function loadChartJS() {
    if (typeof Chart === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = function() {
            if (document.getElementById('prescriptionVolumeChart')) {
                initializePharmacyCharts();
            }
            if (document.getElementById('paymentMethodsChart')) {
                initializePaymentCharts();
            }
            if (document.getElementById('revenueExpensesChart')) {
                initializeFinancialCharts();
            }
            if (document.getElementById('claimStatusChart')) {
                initializeRevenueCycleCharts();
            }
        };
        document.head.appendChild(script);
    } else {
        if (document.getElementById('claimStatusChart')) {
            initializeRevenueCycleCharts();
        }
    }
}

/* ========= Summary Page Functions ========= */
function refreshPharmacyCharts() {
    alert('Refreshing pharmacy data and charts...');
    // Implementation would refresh pharmacy-specific charts
}

function exportPharmacyReport() {
    alert('Exporting pharmacy summary report...');
    // Implementation would generate PDF/Excel report
}

function verifyPendingPrescriptions() {
    alert('Opening pending prescriptions verification...');
    // Implementation would navigate to verification interface
}

function checkInventory() {
    alert('Opening inventory check interface...');
    // Implementation would show inventory management
}

function generatePharmacyReport() {
    alert('Generating pharmacy analytics report...');
    // Implementation would create comprehensive report
}

function generateFinancialReport() {
    alert('Generating financial analytics report...');
}

function generateOperationalReport() {
    alert('Generating operational performance report...');
}

function generateClinicalReport() {
    alert('Generating clinical statistics report...');
}

function generateComplianceReport() {
    alert('Generating compliance and audit report...');
}

/* ========= Enhanced Dropdown Navigation for Summary Pages ========= */
function setupEnhancedDropdowns() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        // Handle main dropdown item click (go to summary pages)
        toggle.addEventListener('click', function(e) {
            const page = this.getAttribute('data-page');
            const hasPageAttribute = this.hasAttribute('data-page');
            
            // If dropdown has data-page attribute, navigate to that summary page
            if (hasPageAttribute && page) {
                e.preventDefault();
                e.stopPropagation();
                
                // Navigate to summary page
                navigateToPage(page);
                
                // Update header title based on which dropdown was clicked
                const dropdownText = this.querySelector('span').textContent;
                const headerH1 = document.querySelector('.header-left h1');
                if (headerH1) {
                    headerH1.textContent = `${dropdownText} Summary`;
                }
                
                // Close all dropdowns
                document.querySelectorAll('.dropdown.active').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
                
                return;
            }
            
            // Default dropdown toggle behavior for click without data-page
            if (!hasPageAttribute) {
                e.preventDefault();
                e.stopPropagation();
                
                const dropdown = this.closest('.dropdown');
                const isActive = dropdown.classList.contains('active');
                
                // Close all other dropdowns
                document.querySelectorAll('.dropdown.active').forEach(activeDropdown => {
                    if (activeDropdown !== dropdown) {
                        activeDropdown.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active', !isActive);
            }
        });
    });
    
    // Handle dropdown menu item clicks
    document.querySelectorAll('.dropdown-menu a').forEach(menuItem => {
        menuItem.addEventListener('click', function(e) {
            const pageId = this.getAttribute('data-page');
            
            if (pageId) {
                // Navigate to the selected page
                navigateToPage(pageId);
                
                // Update header title
                const headerH1 = document.querySelector('.header-left h1');
                if (headerH1) {
                    headerH1.textContent = this.textContent;
                }
                
                // Close dropdown after selection (on mobile)
                if (window.innerWidth <= 768) {
                    const dropdown = this.closest('.dropdown');
                    if (dropdown) {
                        dropdown.classList.remove('active');
                    }
                }
            }
        });
    });
}

// Initialize enhanced dropdowns when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupEnhancedDropdowns();
});

/* ========= Enhanced Summary Page Functions ========= */

// Pharmacy Functions
function refreshPharmacyCharts() {
    alert('Refreshing pharmacy data and charts with latest information...');
    // Implementation would refresh pharmacy-specific charts and data
}

function exportPharmacyReport() {
    alert('Exporting comprehensive pharmacy operations report...');
    // Implementation would generate PDF/Excel report
}

function verifyPendingPrescriptions() {
    alert('Opening pending prescriptions verification interface...');
    // Implementation would navigate to verification page
}

function checkInventory() {
    alert('Opening inventory management interface...');
    // Implementation would show inventory management
}

function generatePharmacyReport() {
    alert('Generating detailed pharmacy analytics report...');
    // Implementation would create comprehensive report
}

// Billing Functions
function refreshBillingData() {
    alert('Refreshing financial data and charts...');
    // Implementation would refresh billing data
}

function exportFinancialReport() {
    alert('Exporting comprehensive financial report...');
    // Implementation would generate financial reports
}

function processBatchPayments() {
    alert('Opening batch payment processing interface...');
    // Implementation would open batch processing
}

function generateInsuranceClaims() {
    alert('Generating insurance claims batch...');
    // Implementation would process claims
}

function runBillingReports() {
    alert('Running comprehensive billing analytics...');
    // Implementation would generate reports
}

// Inventory Functions
function refreshInventoryData() {
    alert('Refreshing inventory data and stock levels...');
    // Implementation would refresh inventory data
}

function exportInventoryReport() {
    alert('Exporting comprehensive inventory management report...');
    // Implementation would generate inventory reports
}

function createPurchaseOrder() {
    alert('Opening purchase order creation interface...');
    document.getElementById('purchaseOrderModal').style.display = 'flex';
}

function checkExpiryDates() {
    alert('Checking items nearing expiration dates...');
    // Implementation would show expiry management
}

function generateInventoryReport() {
    alert('Generating detailed inventory analytics report...');
    // Implementation would create inventory reports
}

/* ========= Chart Initialization for Summary Pages ========= */
function initializeSummaryCharts() {
    // Pharmacy Status Chart
    const pharmacyStatusCtx = document.getElementById('pharmacyStatusChart');
    if (pharmacyStatusCtx) {
        new Chart(pharmacyStatusCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Dispensed', 'Pending', 'Ready', 'Insurance', 'On Hold'],
                datasets: [{
                    data: [65, 15, 8, 7, 5],
                    backgroundColor: ['#10b981', '#f59e0b', '#0ea5e9', '#8b5cf6', '#ef4444']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }

    // Revenue by Department Chart
    const revenueCtx = document.getElementById('revenueByDeptChart');
    if (revenueCtx) {
        new Chart(revenueCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Cardiology', 'Surgery', 'Emergency', 'Pharmacy', 'Lab'],
                datasets: [{
                    label: 'Revenue (M TSH)',
                    data: [68.0, 43.5, 41.3, 38.7, 22.8],
                    backgroundColor: '#0ea5e9'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // Initialize other charts similarly...
}

// Initialize charts when summary pages are loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSummaryCharts();
});

/* ========= System Administration Functions ========= */

function refreshSystemData() {
    alert('Refreshing system data and performance metrics...');
    // Implementation would refresh system monitoring data
    initializeSystemCharts();
}

function exportSystemReport() {
    alert('Exporting comprehensive system administration report...');
    // Implementation would generate system reports
}

function runSystemMaintenance() {
    if (confirm('Are you sure you want to run system maintenance? This may temporarily affect performance.')) {
        alert('System maintenance started... This may take several minutes.');
        // Implementation would run maintenance tasks
    }
}

function manageUsers() {
    alert('Opening user management interface...');
    // Implementation would navigate to user management
}

function runBackup() {
    if (confirm('Start backup process? This may impact system performance temporarily.')) {
        alert('Backup process initiated...');
        // Implementation would start backup
    }
}

function viewSecurity() {
    alert('Opening security center dashboard...');
    // Implementation would show security interface
}

function systemSettings() {
    alert('Opening system configuration settings...');
    // Implementation would open settings
}

/* ========= System Charts Initialization ========= */
function initializeSystemCharts() {
    // System Resources Chart
    const resourcesCtx = document.getElementById('systemResourcesChart');
    if (resourcesCtx) {
        new Chart(resourcesCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['CPU', 'Memory', 'Storage', 'Network'],
                datasets: [{
                    label: 'Usage (%)',
                    data: [45, 62, 72, 68],
                    backgroundColor: [
                        '#0ea5e9',
                        '#10b981',
                        '#f59e0b',
                        '#8b5cf6'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    // User Activity Chart
    const userActivityCtx = document.getElementById('userActivityChart');
    if (userActivityCtx) {
        new Chart(userActivityCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Active Users',
                    data: [120, 135, 142, 138, 156, 98, 85],
                    borderColor: '#0ea5e9',
                    backgroundColor: 'rgba(14, 165, 233, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
}

// Initialize system charts when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the admin summary page
    if (document.getElementById('admin-summary')) {
        initializeSystemCharts();
    }
});

/* ========= Enhanced System Monitoring ========= */
function startRealTimeMonitoring() {
    // Simulate real-time system monitoring
    setInterval(() => {
        // Update CPU usage randomly for demo
        const cpuElement = document.querySelector('.stat-card:nth-child(5) .stat-info h3');
        if (cpuElement) {
            const currentCPU = parseInt(cpuElement.textContent);
            const newCPU = Math.max(30, Math.min(80, currentCPU + (Math.random() * 10 - 5)));
            cpuElement.textContent = Math.round(newCPU) + '%';
        }
    }, 5000);
}

// Start monitoring when admin page is active
document.addEventListener('DOMContentLoaded', function() {
    startRealTimeMonitoring();
});

/* ========= Inventory Management Functions ========= */
function quickAddItem() {
    alert('Opening quick item addition form...');
    // In real application, this would open a simplified add item modal
}

function batchUpdateStock() {
    alert('Opening batch stock update interface...');
    // In real application, this would open batch update modal
}

function generateReorderList() {
    alert('Generating reorder list for low stock items...');
    // In real application, this would generate purchase order suggestions
}

function runStockReport() {
    alert('Generating comprehensive stock report...');
    // In real application, this would generate inventory analytics
}

function viewCriticalItems() {
    alert('Showing critical stock items...');
    // In real application, this would filter to show only critical items
}

function viewInventoryItem(itemCode) {
    alert(`Viewing inventory item: ${itemCode}\nThis would show detailed item information.`);
    // In real application, this would open item detail modal
}

function editInventoryItem(itemCode) {
    alert(`Editing inventory item: ${itemCode}\nThis would open item edit form.`);
    // In real application, this would open edit modal
}

function reorderItem(itemCode) {
    alert(`Initiating reorder for: ${itemCode}\nThis would create a purchase order.`);
    // In real application, this would open purchase order creation
}

function emergencyReorder(itemCode) {
    alert(`Emergency reorder for: ${itemCode}\nPriority order created.`);
    // In real application, this would create urgent purchase order
}

function adjustStock(itemCode) {
    alert(`Adjusting stock for: ${itemCode}\nOpening stock adjustment form.`);
    // In real application, this would open stock adjustment modal
}

function toggleSelectAllInventory() {
    const selectAll = document.getElementById('selectAllInventory');
    const checkboxes = document.querySelectorAll('.inventory-checkbox');
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAll.checked;
    });
}

function searchInventory() {
    const searchTerm = document.getElementById('inventorySearch').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const statusFilter = document.getElementById('stockStatusFilter').value;
    const supplierFilter = document.getElementById('supplierFilter').value;
    
    const rows = document.querySelectorAll('#inventoryTable tbody tr');
    let visibleCount = 0;
    
    rows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        const categoryCell = row.cells[3].textContent.toLowerCase();
        const statusBadge = row.querySelector('.badge').textContent.toLowerCase();
        const supplierCell = row.cells[7].textContent.toLowerCase();
        
        const matchesSearch = !searchTerm || rowText.includes(searchTerm);
        const matchesCategory = !categoryFilter || categoryCell.includes(categoryFilter);
        const matchesStatus = !statusFilter || statusBadge.includes(statusFilter);
        const matchesSupplier = !supplierFilter || supplierCell.includes(supplierFilter);
        
        if (matchesSearch && matchesCategory && matchesStatus && matchesSupplier) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    // Update visible count display
    const countDisplay = document.querySelector('#inventory .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = `Showing ${visibleCount} of 1,248 items`;
    }
}

function clearInventoryFilters() {
    document.getElementById('inventorySearch').value = '';
    document.getElementById('categoryFilter').value = '';
    document.getElementById('stockStatusFilter').value = '';
    document.getElementById('supplierFilter').value = '';
    
    // Show all rows
    const rows = document.querySelectorAll('#inventoryTable tbody tr');
    rows.forEach(row => {
        row.style.display = '';
    });
    
    // Reset count display
    const countDisplay = document.querySelector('#inventory .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = 'Showing 1-10 of 1,248 items';
    }
}

function generateInventoryReport() {
    alert('Exporting inventory report...\nThis would generate a comprehensive PDF report.');
    // In real application, this would generate PDF/Excel report
}

// Initialize inventory search functionality
document.addEventListener('DOMContentLoaded', function() {
    const inventorySearch = document.getElementById('inventorySearch');
    if (inventorySearch) {
        inventorySearch.addEventListener('input', searchInventory);
    }
    
    // Add event listeners to inventory filter dropdowns
    const inventoryFilters = ['categoryFilter', 'stockStatusFilter', 'supplierFilter'];
    inventoryFilters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', searchInventory);
        }
    });
    
    // Add modal trigger for add inventory button
    const addInventoryBtn = document.getElementById('addInventoryBtn');
    const inventoryModal = document.getElementById('inventoryModal');
    if (addInventoryBtn && inventoryModal) {
        addInventoryBtn.addEventListener('click', () => {
            inventoryModal.style.display = 'flex';
        });
    }
    
    // Quick stock take button
    const quickStockTakeBtn = document.getElementById('quickStockTakeBtn');
    if (quickStockTakeBtn) {
        quickStockTakeBtn.addEventListener('click', function() {
            alert('Opening quick stock take interface...\nThis would allow rapid physical count entry.');
        });
    }
});

/* ========= Supply Chain Management Functions ========= */
function createQuickPO() {
    alert('Opening quick purchase order creation...');
    // In real application, this would open a simplified PO creation modal
}

function receiveShipment() {
    alert('Opening goods receipt interface...');
    // In real application, this would open goods receipt form
}

function trackAllShipments() {
    alert('Opening comprehensive shipment tracking dashboard...');
    // In real application, this would show real-time tracking map
}

function supplierPerformance() {
    alert('Opening supplier performance analytics...');
    // In real application, this would show detailed supplier metrics
}

function viewCriticalShipments() {
    alert('Showing critically delayed shipments...');
    // In real application, this would filter to show only delayed shipments
}

function viewPurchaseOrder(poNumber) {
    alert(`Viewing purchase order: ${poNumber}\nThis would show detailed PO information.`);
    // In real application, this would open PO detail modal
}

function trackPurchaseOrder(poNumber) {
    alert(`Tracking purchase order: ${poNumber}\nOpening shipment tracking.`);
    // In real application, this would open tracking interface
}

function receivePurchaseOrder(poNumber) {
    alert(`Receiving goods for purchase order: ${poNumber}\nOpening goods receipt form.`);
    // In real application, this would open goods receipt modal
}

function editPurchaseOrder(poNumber) {
    alert(`Editing purchase order: ${poNumber}\nOpening PO edit form.`);
    // In real application, this would open PO edit modal
}

function cancelPurchaseOrder(poNumber) {
    if (confirm(`Are you sure you want to cancel purchase order ${poNumber}?`)) {
        alert(`Purchase order ${poNumber} cancelled successfully.`);
        // In real application, this would cancel the PO
    }
}

function contactSupplier(poNumber) {
    alert(`Contacting supplier for purchase order: ${poNumber}\nOpening communication interface.`);
    // In real application, this would open supplier contact modal
}

function escalateIssue(poNumber) {
    alert(`Escalating issue for purchase order: ${poNumber}\nIssue escalated to management.`);
    // In real application, this would create escalation ticket
}

function updateTracking(poNumber) {
    alert(`Updating tracking information for: ${poNumber}\nFetching latest status.`);
    // In real application, this would refresh tracking data
}

function generateSupplyChainReport() {
    alert('Generating comprehensive supply chain report...\nThis would create a PDF with all supply chain analytics.');
    // In real application, this would generate detailed report
}

function searchPurchaseOrders() {
    const searchTerm = document.getElementById('supplyChainSearch').value.toLowerCase();
    const statusFilter = document.getElementById('poStatusFilter').value;
    const supplierFilter = document.getElementById('poSupplierFilter').value;
    
    const rows = document.querySelectorAll('#purchaseOrdersTable tbody tr');
    let visibleCount = 0;
    
    rows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        const statusBadge = row.querySelector('.badge').textContent.toLowerCase();
        const supplierCell = row.cells[1].textContent.toLowerCase();
        
        const matchesSearch = !searchTerm || rowText.includes(searchTerm);
        const matchesStatus = !statusFilter || statusBadge.includes(statusFilter);
        const matchesSupplier = !supplierFilter || supplierCell.includes(supplierFilter);
        
        if (matchesSearch && matchesStatus && matchesSupplier) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    // Update visible count display
    const countDisplay = document.querySelector('#supply-chain .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = `Showing ${visibleCount} of 24 purchase orders`;
    }
}

function clearSupplyChainFilters() {
    document.getElementById('supplyChainSearch').value = '';
    document.getElementById('poStatusFilter').value = '';
    document.getElementById('poSupplierFilter').value = '';
    
    // Show all rows
    const rows = document.querySelectorAll('#purchaseOrdersTable tbody tr');
    rows.forEach(row => {
        row.style.display = '';
    });
    
    // Reset count display
    const countDisplay = document.querySelector('#supply-chain .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = 'Showing 1 to 4 of 24 purchase orders';
    }
}

// Initialize supply chain functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add modal trigger for create purchase order button
    const createPurchaseOrderBtn = document.getElementById('createPurchaseOrderBtn');
    const purchaseOrderModal = document.getElementById('purchaseOrderModal');
    if (createPurchaseOrderBtn && purchaseOrderModal) {
        createPurchaseOrderBtn.addEventListener('click', () => {
            purchaseOrderModal.style.display = 'flex';
        });
    }
    
    // Track shipments button
    const trackShipmentsBtn = document.getElementById('trackShipmentsBtn');
    if (trackShipmentsBtn) {
        trackShipmentsBtn.addEventListener('click', function() {
            alert('Opening shipment tracking dashboard...\nThis would show real-time tracking for all active shipments.');
        });
    }
    
    // Auto-refresh tracking data every 30 seconds
    setInterval(() => {
        // In real application, this would refresh tracking data from API
        console.log('Refreshing shipment tracking data...');
    }, 30000);
});

// Simulate real-time tracking updates
function simulateTrackingUpdate() {
    const trackingElements = document.querySelectorAll('.timeline-content');
    trackingElements.forEach(element => {
        const progressBar = element.querySelector('.progress');
        if (progressBar) {
            const currentWidth = parseInt(progressBar.style.width);
            if (currentWidth < 100) {
                const newWidth = Math.min(currentWidth + 5, 100);
                progressBar.style.width = newWidth + '%';
                
                // Update status text
                if (newWidth === 100) {
                    element.querySelector('div').textContent = 'Delivered - Awaiting receipt';
                }
            }
        }
    });
}

// Initialize with some tracking updates
setInterval(simulateTrackingUpdate, 15000);

/* ========= Purchase Orders Management Functions ========= */
function createStandardPO() {
    alert('Opening standard purchase order creation form...');
    // In real application, this would open comprehensive PO creation modal
}

function createQuickPOFromTemplate() {
    alert('Opening quick PO from template...');
    // In real application, this would open template-based PO creation
}

function approveBulkPOs() {
    const selectedPOs = getSelectedPOs();
    if (selectedPOs.length === 0) {
        alert('Please select at least one purchase order to approve.');
        return;
    }
    alert(`Approving ${selectedPOs.length} purchase orders in bulk...`);
    // In real application, this would batch approve POs
}

function viewPOAnalytics() {
    alert('Opening purchase order analytics dashboard...');
    // In real application, this would show comprehensive PO analytics
}

function viewUrgentPOs() {
    alert('Showing urgent purchase orders requiring attention...');
    // In real application, this would filter to show urgent POs
}

function viewPODetails(poNumber) {
    alert(`Viewing purchase order details: ${poNumber}\nThis would show comprehensive PO information.`);
    // In real application, this would open PO detail modal
}

function trackPO(poNumber) {
    alert(`Tracking purchase order: ${poNumber}\nOpening shipment tracking interface.`);
    // In real application, this would open tracking modal with map
}

function receivePO(poNumber) {
    alert(`Receiving goods for purchase order: ${poNumber}\nOpening goods receipt form.`);
    // In real application, this would open goods receipt modal
}

function approvePO(poNumber) {
    if (confirm(`Are you sure you want to approve purchase order ${poNumber}?`)) {
        alert(`Purchase order ${poNumber} approved successfully.`);
        // In real application, this would update PO status and trigger notifications
    }
}

function editPO(poNumber) {
    alert(`Editing purchase order: ${poNumber}\nOpening PO edit form.`);
    // In real application, this would open PO edit modal
}

function contactSupplier(poNumber) {
    alert(`Contacting supplier for purchase order: ${poNumber}\nOpening communication interface.`);
    // In real application, this would open supplier contact modal
}

function escalatePO(poNumber) {
    alert(`Escalating purchase order: ${poNumber}\nIssue escalated to management.`);
    // In real application, this would create escalation ticket and notify managers
}

function updatePOTracking(poNumber) {
    alert(`Updating tracking information for: ${poNumber}\nFetching latest shipment status.`);
    // In real application, this would refresh tracking data from carrier API
}

function submitPO(poNumber) {
    if (confirm(`Are you ready to submit purchase order ${poNumber} for approval?`)) {
        alert(`Purchase order ${poNumber} submitted for approval.`);
        // In real application, this would change status and notify approvers
    }
}

function toggleSelectAllPOs() {
    const selectAll = document.getElementById('selectAllPOs');
    const checkboxes = document.querySelectorAll('.po-checkbox');
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAll.checked;
    });
}

function getSelectedPOs() {
    const selectedPOs = [];
    document.querySelectorAll('.po-checkbox:checked').forEach(checkbox => {
        selectedPOs.push(checkbox.getAttribute('data-po'));
    });
    return selectedPOs;
}

function printSelectedPOs() {
    const selectedPOs = getSelectedPOs();
    if (selectedPOs.length === 0) {
        alert('Please select at least one purchase order to print.');
        return;
    }
    alert(`Printing ${selectedPOs.length} purchase orders...`);
    // In real application, this would generate printable PO documents
}

function emailSelectedPOs() {
    const selectedPOs = getSelectedPOs();
    if (selectedPOs.length === 0) {
        alert('Please select at least one purchase order to email.');
        return;
    }
    alert(`Emailing ${selectedPOs.length} purchase orders...`);
    // In real application, this would open email composer with PO attachments
}

function exportPOsToExcel() {
    alert('Exporting purchase orders to Excel...');
    // In real application, this would generate Excel file with PO data
}

function searchPurchaseOrders() {
    const searchTerm = document.getElementById('poSearch').value.toLowerCase();
    const statusFilter = document.getElementById('poStatusFilter').value;
    const supplierFilter = document.getElementById('poSupplierFilter').value;
    const priorityFilter = document.getElementById('poPriorityFilter').value;
    const departmentFilter = document.getElementById('poDepartmentFilter').value;
    const budgetFilter = document.getElementById('poBudgetFilter').value;
    
    const rows = document.querySelectorAll('#purchaseOrdersTable tbody tr');
    let visibleCount = 0;
    
    rows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        const statusBadge = row.querySelector('.badge').textContent.toLowerCase();
        const supplierCell = row.cells[2].textContent.toLowerCase();
        const priorityBadge = row.cells[7].querySelector('.badge').textContent.toLowerCase();
        const budgetCell = row.cells[5].textContent.toLowerCase();
        
        const matchesSearch = !searchTerm || rowText.includes(searchTerm);
        const matchesStatus = !statusFilter || statusBadge.includes(statusFilter);
        const matchesSupplier = !supplierFilter || supplierCell.includes(supplierFilter);
        const matchesPriority = !priorityFilter || priorityBadge.includes(priorityFilter);
        const matchesBudget = !budgetFilter || budgetCell.includes(budgetFilter);
        
        if (matchesSearch && matchesStatus && matchesSupplier && matchesPriority && matchesBudget) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    // Update visible count display
    const countDisplay = document.querySelector('#purchase-orders .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = `Showing ${visibleCount} of 156 purchase orders`;
    }
}

function clearPOFilters() {
    document.getElementById('poSearch').value = '';
    document.getElementById('poStatusFilter').value = '';
    document.getElementById('poSupplierFilter').value = '';
    document.getElementById('poPriorityFilter').value = '';
    document.getElementById('poDepartmentFilter').value = '';
    document.getElementById('poBudgetFilter').value = '';
    document.getElementById('poStartDate').value = '';
    document.getElementById('poEndDate').value = '';
    
    // Show all rows
    const rows = document.querySelectorAll('#purchaseOrdersTable tbody tr');
    rows.forEach(row => {
        row.style.display = '';
    });
    
    // Reset count display
    const countDisplay = document.querySelector('#purchase-orders .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = 'Showing 1-8 of 156 purchase orders';
    }
}

function generatePOReport() {
    alert('Generating comprehensive purchase orders report...\nThis would create a PDF with all PO analytics and metrics.');
    // In real application, this would generate detailed report
}

// Initialize purchase orders functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add modal trigger for create new PO button
    const createNewPOBtn = document.getElementById('createNewPOBtn');
    const purchaseOrderModal = document.getElementById('purchaseOrderModal');
    if (createNewPOBtn && purchaseOrderModal) {
        createNewPOBtn.addEventListener('click', () => {
            purchaseOrderModal.style.display = 'flex';
        });
    }
    
    // Import PO button
    const importPOBtn = document.getElementById('importPOBtn');
    if (importPOBtn) {
        importPOBtn.addEventListener('click', function() {
            alert('Opening purchase order import interface...\nThis would allow importing POs from Excel/CSV files.');
        });
    }
    
    // Set default date range to last 30 days
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    
    document.getElementById('poStartDate').value = startDate.toISOString().split('T')[0];
    document.getElementById('poEndDate').value = endDate.toISOString().split('T')[0];
    
    // Add event listeners to search and filter elements
    const poSearch = document.getElementById('poSearch');
    if (poSearch) {
        poSearch.addEventListener('input', searchPurchaseOrders);
    }
    
    const poFilters = ['poStatusFilter', 'poSupplierFilter', 'poPriorityFilter', 'poDepartmentFilter', 'poBudgetFilter'];
    poFilters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', searchPurchaseOrders);
        }
    });
    
    // Date range filters
    const dateFilters = ['poStartDate', 'poEndDate'];
    dateFilters.forEach(dateId => {
        const dateFilter = document.getElementById(dateId);
        if (dateFilter) {
            dateFilter.addEventListener('change', searchPurchaseOrders);
        }
    });
});

// Simulate real-time status updates
function simulatePOStatusUpdates() {
    const statusBadges = document.querySelectorAll('#purchaseOrdersTable .badge');
    statusBadges.forEach(badge => {
        if (badge.textContent === 'Pending Approval') {
            // Randomly approve some POs
            if (Math.random() < 0.1) { // 10% chance
                badge.textContent = 'Approved';
                badge.className = 'badge badge-success';
                badge.nextElementSibling.textContent = 'Ready to order';
            }
        } else if (badge.textContent === 'Approved') {
            // Randomly order some POs
            if (Math.random() < 0.15) { // 15% chance
                badge.textContent = 'Ordered';
                badge.className = 'badge badge-warning';
                badge.nextElementSibling.textContent = 'With supplier';
            }
        } else if (badge.textContent === 'Ordered') {
            // Randomly ship some POs
            if (Math.random() < 0.2) { // 20% chance
                badge.textContent = 'Shipped';
                badge.className = 'badge badge-info';
                badge.nextElementSibling.textContent = 'In transit';
            }
        }
    });
}

// Initialize with status updates
setInterval(simulatePOStatusUpdates, 30000); // Update every 30 seconds

/* ========= Vendor Management Functions ========= */
function addNewVendor() {
    alert('Opening new vendor registration form...');
    // In real application, this would open vendor registration modal
}

function sendBulkCommunications() {
    alert('Opening bulk communication interface...');
    // In real application, this would open communication manager
}

function generateVendorReports() {
    alert('Generating vendor performance reports...');
    // In real application, this would generate comprehensive reports
}

function manageContracts() {
    alert('Opening contract management dashboard...');
    // In real application, this would open contract management interface
}

function viewVendorDetails(vendorId) {
    alert(`Viewing vendor details: ${vendorId}\nThis would show comprehensive vendor profile.`);
    // In real application, this would open vendor detail modal
}

function editVendor(vendorId) {
    alert(`Editing vendor: ${vendorId}\nThis would open vendor edit form.`);
    // In real application, this would open vendor edit modal
}

function contactVendor(vendorId) {
    alert(`Contacting vendor: ${vendorId}\nThis would open communication interface.`);
    // In real application, this would open contact modal
}

function approveVendor(vendorId) {
    if (confirm(`Are you sure you want to approve vendor ${vendorId}?`)) {
        alert(`Vendor ${vendorId} approved successfully!`);
        // In real application, this would update vendor status
    }
}

function reactivateVendor(vendorId) {
    if (confirm(`Are you sure you want to reactivate vendor ${vendorId}?`)) {
        alert(`Vendor ${vendorId} reactivated successfully!`);
        // In real application, this would update vendor status
    }
}

function searchVendors() {
    const searchTerm = document.getElementById('vendorSearch').value.toLowerCase();
    const statusFilter = document.getElementById('vendorStatusFilter').value;
    const categoryFilter = document.getElementById('vendorCategoryFilter').value;
    
    const rows = document.querySelectorAll('#vendorsTable tbody tr');
    let visibleCount = 0;
    
    rows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        const statusBadge = row.querySelector('.badge').textContent.toLowerCase();
        const categoryCell = row.cells[2].textContent.toLowerCase();
        
        const matchesSearch = !searchTerm || rowText.includes(searchTerm);
        const matchesStatus = !statusFilter || statusBadge.includes(statusFilter);
        const matchesCategory = !categoryFilter || categoryCell.includes(categoryFilter);
        
        if (matchesSearch && matchesStatus && matchesCategory) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    // Update visible count display
    const countDisplay = document.querySelector('#vendor-management .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = `Showing ${visibleCount} of 42 vendors`;
    }
}

function clearVendorFilters() {
    document.getElementById('vendorSearch').value = '';
    document.getElementById('vendorStatusFilter').value = '';
    document.getElementById('vendorCategoryFilter').value = '';
    document.getElementById('vendorRatingFilter').value = '';
    
    // Show all rows
    const rows = document.querySelectorAll('#vendorsTable tbody tr');
    rows.forEach(row => {
        row.style.display = '';
    });
    
    // Reset count display
    const countDisplay = document.querySelector('#vendor-management .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = 'Showing 1-8 of 42 vendors';
    }
}

// Initialize vendor management functionality
document.addEventListener('DOMContentLoaded', function() {
    const vendorSearch = document.getElementById('vendorSearch');
    if (vendorSearch) {
        vendorSearch.addEventListener('input', searchVendors);
    }
    
    // Add event listeners to vendor filter dropdowns
    const vendorFilters = ['vendorStatusFilter', 'vendorCategoryFilter', 'vendorRatingFilter'];
    vendorFilters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', searchVendors);
        }
    });
    
    // Add vendor modal functionality
    const addVendorBtn = document.getElementById('addVendorBtn');
    if (addVendorBtn) {
        addVendorBtn.addEventListener('click', function() {
            // Create and show vendor modal
            showVendorModal();
        });
    }
});

function showVendorModal() {
    // In real application, this would create and show a vendor registration modal
    alert('Opening vendor registration modal...\nThis would show a comprehensive vendor registration form.');
}

/* ========= Asset Tracking Functions ========= */
function addNewAsset() {
    alert('Opening new asset registration form...');
    // In real application, this would open asset registration modal
}

function scheduleMaintenance() {
    alert('Opening maintenance scheduling interface...');
    // In real application, this would open maintenance scheduler
}

function performAssetAudit() {
    alert('Starting asset audit process...');
    // In real application, this would open audit interface
}

function generateAssetReports() {
    alert('Generating asset management reports...');
    // In real application, this would generate comprehensive reports
}

function viewAssetDetails(assetId) {
    alert(`Viewing asset details: ${assetId}\nThis would show comprehensive asset profile.`);
    // In real application, this would open asset detail modal
}

function editAsset(assetId) {
    alert(`Editing asset: ${assetId}\nThis would open asset edit form.`);
    // In real application, this would open asset edit modal
}

function scheduleAssetMaintenance(assetId) {
    alert(`Scheduling maintenance for: ${assetId}\nThis would open maintenance scheduling form.`);
    // In real application, this would open maintenance scheduler
}

function updateMaintenance(assetId) {
    alert(`Updating maintenance status for: ${assetId}\nThis would open maintenance update form.`);
    // In real application, this would open maintenance update modal
}

function extendWarranty(assetId) {
    alert(`Extending warranty for: ${assetId}\nThis would open warranty extension form.`);
    // In real application, this would open warranty extension modal
}

function moveAsset(assetId) {
    alert(`Moving asset: ${assetId}\nThis would open asset relocation form.`);
    // In real application, this would open asset move modal
}

function reactivateAsset(assetId) {
    if (confirm(`Are you sure you want to reactivate asset ${assetId}?`)) {
        alert(`Asset ${assetId} reactivated successfully!`);
        // In real application, this would update asset status
    }
}

function disposeAsset(assetId) {
    if (confirm(`Are you sure you want to dispose of asset ${assetId}? This action cannot be undone.`)) {
        alert(`Asset ${assetId} marked for disposal.`);
        // In real application, this would update asset status to disposed
    }
}

function searchAssets() {
    const searchTerm = document.getElementById('assetSearch').value.toLowerCase();
    const statusFilter = document.getElementById('assetStatusFilter').value;
    const categoryFilter = document.getElementById('assetCategoryFilter').value;
    const departmentFilter = document.getElementById('assetDepartmentFilter').value;
    
    const rows = document.querySelectorAll('#assetsTable tbody tr');
    let visibleCount = 0;
    
    rows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        const statusBadge = row.querySelector('.badge').textContent.toLowerCase();
        const categoryCell = row.cells[2].textContent.toLowerCase();
        const locationCell = row.cells[4].textContent.toLowerCase();
        
        const matchesSearch = !searchTerm || rowText.includes(searchTerm);
        const matchesStatus = !statusFilter || statusBadge.includes(statusFilter);
        const matchesCategory = !categoryFilter || categoryCell.includes(categoryFilter);
        const matchesDepartment = !departmentFilter || locationCell.includes(departmentFilter);
        
        if (matchesSearch && matchesStatus && matchesCategory && matchesDepartment) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    // Update visible count display
    const countDisplay = document.querySelector('#asset-tracking .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = `Showing ${visibleCount} of 248 assets`;
    }
}

function clearAssetFilters() {
    document.getElementById('assetSearch').value = '';
    document.getElementById('assetStatusFilter').value = '';
    document.getElementById('assetCategoryFilter').value = '';
    document.getElementById('assetDepartmentFilter').value = '';
    document.getElementById('warrantyStatusFilter').value = '';
    document.getElementById('maintenanceFilter').value = '';
    
    // Show all rows
    const rows = document.querySelectorAll('#assetsTable tbody tr');
    rows.forEach(row => {
        row.style.display = '';
    });
    
    // Reset count display
    const countDisplay = document.querySelector('#asset-tracking .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = 'Showing 1-8 of 248 assets';
    }
}

// Initialize asset tracking functionality
document.addEventListener('DOMContentLoaded', function() {
    const assetSearch = document.getElementById('assetSearch');
    if (assetSearch) {
        assetSearch.addEventListener('input', searchAssets);
    }
    
    // Add event listeners to asset filter dropdowns
    const assetFilters = [
        'assetStatusFilter', 
        'assetCategoryFilter', 
        'assetDepartmentFilter',
        'warrantyStatusFilter',
        'maintenanceFilter'
    ];
    
    assetFilters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', searchAssets);
        }
    });
    
    // Add asset modal functionality
    const addAssetBtn = document.getElementById('addAssetBtn');
    if (addAssetBtn) {
        addAssetBtn.addEventListener('click', function() {
            showAssetModal();
        });
    }
});

function showAssetModal() {
    // In real application, this would create and show an asset registration modal
    alert('Opening asset registration modal...\nThis would show a comprehensive asset registration form.');
}

// QR Code/Label Generation
function generateAssetLabels() {
    alert('Generating asset labels and QR codes...\nThis would create printable asset identification labels.');
}

/* ========= Stock Levels Functions ========= */
function performStockCount() {
    alert('Opening stock count interface...\nThis would allow physical inventory counting.');
    // In real application, this would open stock count modal
}

function generateReorderList() {
    alert('Generating reorder list...\nThis would create a list of items needing reorder.');
    // In real application, this would generate reorder list
}

function viewExpiryReport() {
    alert('Opening expiry report...\nThis would show items nearing expiration.');
    // In real application, this would open expiry report
}

function generateStockReport() {
    alert('Generating comprehensive stock report...\nThis would create inventory analytics.');
    // In real application, this would generate stock report
}

function reorderItem(itemCode) {
    alert(`Initiating reorder for: ${itemCode}\nThis would open purchase order creation.`);
    // In real application, this would open purchase order modal
}

function emergencyReorder(itemCode) {
    alert(`Initiating emergency reorder for: ${itemCode}\nThis would create urgent purchase order.`);
    // In real application, this would create emergency order
}

function adjustStock(itemCode) {
    alert(`Adjusting stock for: ${itemCode}\nThis would open stock adjustment form.`);
    // In real application, this would open stock adjustment modal
}

function viewItemHistory(itemCode) {
    alert(`Viewing history for: ${itemCode}\nThis would show stock movement history.`);
    // In real application, this would open item history modal
}

function transferStock(itemCode) {
    alert(`Transferring stock for: ${itemCode}\nThis would open stock transfer form.`);
    // In real application, this would open transfer modal
}

function searchStockItems() {
    const searchTerm = document.getElementById('stockSearch').value.toLowerCase();
    const statusFilter = document.getElementById('stockStatusFilter').value;
    const categoryFilter = document.getElementById('stockCategoryFilter').value;
    const locationFilter = document.getElementById('stockLocationFilter').value;
    const expiryFilter = document.getElementById('expiryStatusFilter').value;
    
    const rows = document.querySelectorAll('#stockTable tbody tr');
    let visibleCount = 0;
    
    rows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        const statusBadge = row.querySelector('.badge').textContent.toLowerCase();
        const categoryCell = row.cells[2].textContent.toLowerCase();
        const locationCell = row.cells[6].textContent.toLowerCase();
        const expiryCell = row.cells[7].textContent.toLowerCase();
        
        const matchesSearch = !searchTerm || rowText.includes(searchTerm);
        const matchesStatus = !statusFilter || statusBadge.includes(statusFilter);
        const matchesCategory = !categoryFilter || categoryCell.includes(categoryFilter);
        const matchesLocation = !locationFilter || locationCell.includes(locationFilter);
        const matchesExpiry = !expiryFilter || checkExpiryStatus(expiryCell, expiryFilter);
        
        if (matchesSearch && matchesStatus && matchesCategory && matchesLocation && matchesExpiry) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    // Update visible count display
    const countDisplay = document.querySelector('#stock-levels .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = `Showing ${visibleCount} of 1,248 items`;
    }
}

function checkExpiryStatus(expiryDate, filter) {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    
    switch(filter) {
        case 'expired':
            return daysUntilExpiry < 0;
        case 'expiring_soon':
            return daysUntilExpiry >= 0 && daysUntilExpiry <= 30;
        case 'expiring_3months':
            return daysUntilExpiry > 30 && daysUntilExpiry <= 90;
        case 'no_expiry':
            return expiryDate === 'No Expiry' || !expiryDate;
        default:
            return true;
    }
}

function clearStockFilters() {
    document.getElementById('stockSearch').value = '';
    document.getElementById('stockStatusFilter').value = '';
    document.getElementById('stockCategoryFilter').value = '';
    document.getElementById('stockLocationFilter').value = '';
    document.getElementById('expiryStatusFilter').value = '';
    document.getElementById('reorderStatusFilter').value = '';
    
    // Show all rows
    const rows = document.querySelectorAll('#stockTable tbody tr');
    rows.forEach(row => {
        row.style.display = '';
    });
    
    // Reset count display
    const countDisplay = document.querySelector('#stock-levels .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = 'Showing 1-8 of 1,248 items';
    }
}

// Initialize stock levels functionality
document.addEventListener('DOMContentLoaded', function() {
    const stockSearch = document.getElementById('stockSearch');
    if (stockSearch) {
        stockSearch.addEventListener('input', searchStockItems);
    }
    
    // Add event listeners to stock filter dropdowns
    const stockFilters = [
        'stockStatusFilter', 
        'stockCategoryFilter', 
        'stockLocationFilter',
        'expiryStatusFilter',
        'reorderStatusFilter'
    ];
    
    stockFilters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', searchStockItems);
        }
    });
    
    // Add stock adjustment functionality
    const stockAdjustmentBtn = document.getElementById('stockAdjustmentBtn');
    if (stockAdjustmentBtn) {
        stockAdjustmentBtn.addEventListener('click', function() {
            showStockAdjustmentModal();
        });
    }
});

function showStockAdjustmentModal() {
    // In real application, this would create and show a stock adjustment modal
    alert('Opening stock adjustment modal...\nThis would allow manual stock quantity updates.');
}

// Stock level calculations and alerts
function calculateStockLevel(currentStock, reorderLevel, maxStock) {
    const percentage = (currentStock / maxStock) * 100;
    
    if (percentage <= 15) return 'critical';
    if (percentage <= 30) return 'low';
    if (percentage <= 80) return 'optimal';
    return 'overstock';
}

function checkReorderNeeded(currentStock, reorderLevel) {
    return currentStock <= reorderLevel;
}

/* ========= Equipment Tracking Functions ========= */
function addNewEquipment() {
    alert('Opening new equipment registration form...');
    // In real application, this would open equipment registration modal
}

function scheduleEquipmentMaintenance() {
    alert('Opening maintenance scheduling interface...');
    // In real application, this would open maintenance scheduler
}

function performEquipmentAudit() {
    alert('Starting equipment audit process...');
    // In real application, this would open audit interface
}

function generateEquipmentReports() {
    alert('Generating equipment management reports...');
    // In real application, this would generate comprehensive reports
}

function viewEquipmentDetails(equipmentId) {
    alert(`Viewing equipment details: ${equipmentId}\nThis would show comprehensive equipment profile.`);
    // In real application, this would open equipment detail modal
}

function scheduleMaintenance(equipmentId) {
    alert(`Scheduling maintenance for: ${equipmentId}\nThis would open maintenance scheduling form.`);
    // In real application, this would open maintenance scheduler
}

function updateMaintenanceStatus(equipmentId) {
    alert(`Updating maintenance status for: ${equipmentId}\nThis would open maintenance update form.`);
    // In real application, this would open maintenance update modal
}

function moveEquipment(equipmentId) {
    alert(`Moving equipment: ${equipmentId}\nThis would open equipment relocation form.`);
    // In real application, this would open equipment move modal
}

function reserveEquipment(equipmentId) {
    alert(`Reserving equipment: ${equipmentId}\nThis would open equipment reservation form.`);
    // In real application, this would open reservation modal
}

function scheduleCalibration(equipmentId) {
    alert(`Scheduling calibration for: ${equipmentId}\nThis would open calibration scheduling form.`);
    // In real application, this would open calibration scheduler
}

function extendWarranty(equipmentId) {
    alert(`Extending warranty for: ${equipmentId}\nThis would open warranty extension form.`);
    // In real application, this would open warranty extension modal
}

function reactivateEquipment(equipmentId) {
    if (confirm(`Are you sure you want to reactivate equipment ${equipmentId}?`)) {
        alert(`Equipment ${equipmentId} reactivated successfully!`);
        // In real application, this would update equipment status
    }
}

function disposeEquipment(equipmentId) {
    if (confirm(`Are you sure you want to dispose of equipment ${equipmentId}? This action cannot be undone.`)) {
        alert(`Equipment ${equipmentId} marked for disposal.`);
        // In real application, this would update equipment status to disposed
    }
}

function searchEquipment() {
    const searchTerm = document.getElementById('equipmentSearch').value.toLowerCase();
    const statusFilter = document.getElementById('equipmentStatusFilter').value;
    const typeFilter = document.getElementById('equipmentTypeFilter').value;
    const departmentFilter = document.getElementById('equipmentDepartmentFilter').value;
    const maintenanceFilter = document.getElementById('maintenanceStatusFilter').value;
    const calibrationFilter = document.getElementById('calibrationStatusFilter').value;
    
    const rows = document.querySelectorAll('#equipmentTable tbody tr');
    let visibleCount = 0;
    
    rows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        const statusBadge = row.cells[5].querySelector('.badge').textContent.toLowerCase();
        const typeCell = row.cells[2].textContent.toLowerCase();
        const locationCell = row.cells[4].textContent.toLowerCase();
        const maintenanceCell = row.cells[6].textContent.toLowerCase();
        const calibrationCell = row.cells[7].textContent.toLowerCase();
        
        const matchesSearch = !searchTerm || rowText.includes(searchTerm);
        const matchesStatus = !statusFilter || statusBadge.includes(statusFilter);
        const matchesType = !typeFilter || typeCell.includes(typeFilter);
        const matchesDepartment = !departmentFilter || locationCell.includes(departmentFilter);
        const matchesMaintenance = !maintenanceFilter || maintenanceCell.includes(maintenanceFilter);
        const matchesCalibration = !calibrationFilter || calibrationCell.includes(calibrationFilter);
        
        if (matchesSearch && matchesStatus && matchesType && matchesDepartment && matchesMaintenance && matchesCalibration) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    // Update visible count display
    const countDisplay = document.querySelector('#equipment-tracking .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = `Showing ${visibleCount} of 156 equipment`;
    }
}

function clearEquipmentFilters() {
    document.getElementById('equipmentSearch').value = '';
    document.getElementById('equipmentStatusFilter').value = '';
    document.getElementById('equipmentTypeFilter').value = '';
    document.getElementById('equipmentDepartmentFilter').value = '';
    document.getElementById('maintenanceStatusFilter').value = '';
    document.getElementById('calibrationStatusFilter').value = '';
    
    // Show all rows
    const rows = document.querySelectorAll('#equipmentTable tbody tr');
    rows.forEach(row => {
        row.style.display = '';
    });
    
    // Reset count display
    const countDisplay = document.querySelector('#equipment-tracking .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = 'Showing 1-8 of 156 equipment';
    }
}

// Initialize equipment tracking functionality
document.addEventListener('DOMContentLoaded', function() {
    const equipmentSearch = document.getElementById('equipmentSearch');
    if (equipmentSearch) {
        equipmentSearch.addEventListener('input', searchEquipment);
    }
    
    // Add event listeners to equipment filter dropdowns
    const equipmentFilters = [
        'equipmentStatusFilter', 
        'equipmentTypeFilter', 
        'equipmentDepartmentFilter',
        'maintenanceStatusFilter',
        'calibrationStatusFilter'
    ];
    
    equipmentFilters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', searchEquipment);
        }
    });
    
    // Add equipment modal functionality
    const addEquipmentBtn = document.getElementById('addEquipmentBtn');
    if (addEquipmentBtn) {
        addEquipmentBtn.addEventListener('click', function() {
            showEquipmentModal();
        });
    }
});

function showEquipmentModal() {
    // In real application, this would create and show an equipment registration modal
    alert('Opening equipment registration modal...\nThis would show a comprehensive equipment registration form.');
}

// Equipment utilization calculations
function calculateUtilizationRate(usageHours, availableHours = 24) {
    return Math.min(100, Math.round((usageHours / availableHours) * 100));
}

function getUtilizationStatus(utilizationRate) {
    if (utilizationRate >= 80) return 'High Usage';
    if (utilizationRate >= 50) return 'Moderate Usage';
    if (utilizationRate >= 20) return 'Low Usage';
    return 'Not in Use';
}

// QR Code scanning functionality
function scanEquipment() {
    alert('Opening QR code scanner...\nThis would activate camera for equipment scanning.');
    // In real application, this would activate device camera
}

// Maintenance scheduling
function schedulePreventiveMaintenance(equipmentId, maintenanceType) {
    alert(`Scheduling ${maintenanceType} for ${equipmentId}\nThis would open maintenance scheduling form.`);
}

/* ========= Enhanced Staff Management Functions ========= */
function generateStaffReport() {
    alert('Generating staff management report...\nThis would create a comprehensive HR report.');
}

function openBulkUpload() {
    alert('Opening bulk staff upload interface...\nThis would allow CSV import of employee data.');
}

function viewEmployeeProfile(employeeId) {
    alert(`Viewing employee profile: ${employeeId}\nThis would open detailed employee information.`);
}

function editEmployee(employeeId) {
    alert(`Editing employee: ${employeeId}\nThis would open employee edit form.`);
}

function requestLeaveForEmployee(employeeId) {
    // Pre-fill the leave request modal with employee data
    const employeeData = {
        'EMP-1001': { name: 'Dr. John Smith', department: 'Cardiology' },
        'EMP-1002': { name: 'Sarah Johnson, RN', department: 'Emergency' },
        'EMP-1004': { name: 'Robert Davis', department: 'Pharmacy' }
    };
    
    const data = employeeData[employeeId];
    if (data) {
        // In real application, this would pre-fill the leave request form
        document.getElementById('leaveRequestModal').style.display = 'flex';
        alert(`Opening leave request form for: ${data.name}\nDepartment: ${data.department}`);
    }
}

function viewLeaveRequest(employeeId) {
    alert(`Viewing pending leave request for employee: ${employeeId}\nThis would show leave request details.`);
}

function modifyCurrentLeave(employeeId) {
    alert(`Modifying current leave for employee: ${employeeId}\nThis would allow editing active leave.`);
}

// Leave Management Functions
function viewPendingLeaves() {
    alert('Opening pending leave requests dashboard...\nShowing all leaves awaiting approval.');
}

function viewAllLeaves() {
    alert('Opening comprehensive leave management system...\nShowing all leave records.');
}

function viewLeaveDetails(leaveId) {
    alert(`Viewing leave details: ${leaveId}\nThis would show complete leave information.`);
}

function modifyLeave(leaveId) {
    alert(`Modifying leave: ${leaveId}\nThis would open leave edit form.`);
}

function approveLeave(leaveId) {
    if (confirm(`Are you sure you want to approve leave ${leaveId}?`)) {
        alert(`Leave ${leaveId} approved successfully!\nNotifications sent to employee and department.`);
        // In real application, this would update status and send notifications
    }
}

function rejectLeave(leaveId) {
    const reason = prompt('Please enter reason for rejection:');
    if (reason) {
        alert(`Leave ${leaveId} rejected.\nReason: ${reason}\nNotification sent to employee.`);
        // In real application, this would update status and send notification
    }
}

function searchStaff() {
    const searchTerm = document.getElementById('staffSearch').value.toLowerCase();
    const departmentFilter = document.getElementById('departmentFilter').value;
    const typeFilter = document.getElementById('employmentTypeFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    
    const rows = document.querySelectorAll('#staffTable tbody tr');
    let visibleCount = 0;
    
    rows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        const department = row.cells[2].textContent.toLowerCase();
        const status = row.cells[6].textContent.toLowerCase();
        
        const matchesSearch = !searchTerm || rowText.includes(searchTerm);
        const matchesDepartment = !departmentFilter || department.includes(departmentFilter);
        const matchesStatus = !statusFilter || status.includes(statusFilter);
        
        if (matchesSearch && matchesDepartment && matchesStatus) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    // Update visible count display
    const countDisplay = document.querySelector('#hr .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = `Showing ${visibleCount} of 342 employees`;
    }
}

function clearStaffFilters() {
    document.getElementById('staffSearch').value = '';
    document.getElementById('departmentFilter').value = '';
    document.getElementById('employmentTypeFilter').value = '';
    document.getElementById('statusFilter').value = '';
    
    // Show all rows
    const rows = document.querySelectorAll('#staffTable tbody tr');
    rows.forEach(row => {
        row.style.display = '';
    });
    
    // Reset count display
    const countDisplay = document.querySelector('#hr .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = 'Showing 1-10 of 342 employees';
    }
}

// Initialize staff search functionality
document.addEventListener('DOMContentLoaded', function() {
    const staffSearch = document.getElementById('staffSearch');
    if (staffSearch) {
        staffSearch.addEventListener('input', searchStaff);
    }
    
    // Add event listeners to filter dropdowns
    const staffFilters = ['departmentFilter', 'employmentTypeFilter', 'statusFilter'];
    staffFilters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', searchStaff);
        }
    });
    
    // Initialize leave balance progress bars
    initializeLeaveBalances();
});

function initializeLeaveBalances() {
    // In real application, this would calculate and initialize leave balances
    console.log('Leave balances initialized');
}

/* ========= Staff Scheduling Functions ========= */
let currentWeek = new Date('2023-10-16'); // Starting week

function updateWeekDisplay() {
    const weekStart = new Date(currentWeek);
    const weekEnd = new Date(currentWeek);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const displayText = `Week of ${weekStart.toLocaleDateString('en-US', options)}`;
    document.getElementById('currentWeekDisplay').textContent = displayText;
}

function previousWeek() {
    currentWeek.setDate(currentWeek.getDate() - 7);
    updateWeekDisplay();
    loadScheduleData();
    alert('Loading previous week schedule...');
}

function nextWeek() {
    currentWeek.setDate(currentWeek.getDate() + 7);
    updateWeekDisplay();
    loadScheduleData();
    alert('Loading next week schedule...');
}

function filterSchedule() {
    const department = document.getElementById('scheduleDepartment').value;
    const shiftType = document.getElementById('shiftTypeFilter').value;
    
    // In real application, this would filter the schedule data
    alert(`Filtering schedule for: ${department} department, ${shiftType} shifts`);
    loadScheduleData();
}

function changeViewType() {
    const viewType = document.getElementById('viewType').value;
    alert(`Changing to ${viewType} view`);
    // In real application, this would change the schedule display
}

function autoGenerateSchedule() {
    if (confirm('Generate automatic schedule for all departments? This will overwrite existing shifts.')) {
        alert('Auto-generating schedule using AI optimization...\nThis may take a few moments.');
        // In real application, this would call backend AI scheduling
        simulateAutoGeneration();
    }
}

function simulateAutoGeneration() {
    // Simulate AI schedule generation
    setTimeout(() => {
        alert('Schedule generated successfully!\nCoverage: 96%\nEfficiency: 92%\nCompliance: 94%');
        loadScheduleData();
    }, 2000);
}

function manageShiftTemplates() {
    alert('Opening shift template management...\nManage standard shift patterns and rotations.');
}

function viewTimeOffRequests() {
    alert('Opening time off requests dashboard...\nShowing all pending leave requests affecting schedule.');
}

function openSwapRequests() {
    alert('Opening shift swap management...\nManage employee shift exchange requests.');
}

function editShift(shiftId) {
    alert(`Editing shift: ${shiftId}\nOpening shift modification form.`);
    // In real application, this would open shift edit modal
}

function fillShiftGap(gapId) {
    alert(`Filling shift gap: ${gapId}\nOpening staff assignment interface.`);
    // In real application, this would open staff assignment modal
}

function viewShiftGaps() {
    alert('Opening shift gaps dashboard...\nShowing all unfilled shifts requiring coverage.');
}

function exportSchedule() {
    alert('Exporting schedule data...\nFormats: PDF, Excel, CSV available.');
}

function printSchedule() {
    alert('Opening print preview...\nGenerating printable schedule format.');
}

function generateComplianceReport() {
    alert('Generating schedule compliance report...\nIncludes coverage rates, overtime analysis, and compliance metrics.');
}

function loadScheduleData() {
    // In real application, this would load schedule data from backend
    console.log('Loading schedule data for week:', currentWeek);
}

// Initialize scheduling functionality
document.addEventListener('DOMContentLoaded', function() {
    updateWeekDisplay();
    loadScheduleData();
    
    // Add keyboard shortcuts for schedule navigation
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey) {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    previousWeek();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    nextWeek();
                    break;
            }
        }
    });
});

// Quick schedule actions for the main HR page
function quickScheduleView() {
    // This function can be called from the main HR page to quickly access scheduling
    const schedulingPage = document.getElementById('staff-scheduling');
    if (schedulingPage) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show scheduling page
        schedulingPage.classList.add('active');
        
        // Update header
        const headerH1 = document.querySelector('.header-left h1');
        if (headerH1) {
            headerH1.textContent = 'Staff Scheduling';
        }
        
        // Update active sidebar item
        document.querySelectorAll('.sidebar-menu a').forEach(a => a.classList.remove('active'));
        const scheduleLink = document.querySelector('.sidebar-menu a[data-page="staff-scheduling"]');
        if (scheduleLink) {
            scheduleLink.classList.add('active');
        }
    }
}

/* ========= Payroll Management Functions ========= */
function runPayrollProcessing() {
    alert('Opening payroll processing wizard...\nThis would guide through the payroll calculation process.');
}

function generateBatchPayslips() {
    alert('Generating payslips for all employees...\nThis would create PDF payslips for distribution.');
}

function viewPayrollReports() {
    alert('Opening payroll reports dashboard...\nThis would show comprehensive payroll analytics.');
}

function manageDeductions() {
    alert('Opening deductions management...\nThis would allow configuring tax rates and deductions.');
}

function viewPayslip(employeeId) {
    alert(`Viewing payslip for employee: ${employeeId}\nThis would display the detailed payslip.`);
}

function editPayroll(employeeId) {
    alert(`Editing payroll for employee: ${employeeId}\nThis would open payroll adjustment form.`);
}

function downloadPayslip(employeeId) {
    alert(`Downloading payslip for employee: ${employeeId}\nPDF download started.`);
}

function approvePayroll(employeeId) {
    if (confirm(`Approve payroll for employee ${employeeId}?`)) {
        alert(`Payroll approved for employee: ${employeeId}`);
        // In real application, this would update the status in the system
    }
}

function previewPayroll() {
    alert('Generating payroll preview...\nThis would show a summary before final processing.');
}

function runPayroll() {
    if (confirm('Are you sure you want to run payroll for the selected period? This action cannot be undone.')) {
        alert('Payroll processing started...\nThis would process salaries for all selected employees.');
        // In real application, this would initiate the payroll processing
    }
}

// Initialize payroll functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set default payment date to 5th of next month
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    nextMonth.setDate(5);
    
    const paymentDate = document.getElementById('paymentDate');
    if (paymentDate) {
        paymentDate.value = nextMonth.toISOString().split('T')[0];
    }
    
    // Add event listener for payroll period change
    const payrollPeriod = document.getElementById('payrollPeriod');
    if (payrollPeriod) {
        payrollPeriod.addEventListener('change', function() {
            alert(`Loading payroll data for: ${this.options[this.selectedIndex].text}`);
            // In real application, this would reload the payroll data
        });
    }
});

/* ========= Clinical Training Functions ========= */
function scheduleNewTraining() {
    alert('Opening training scheduling wizard...\nThis would guide through setting up a new training session.');
}

function manageCertifications() {
    alert('Opening certification management...\nThis would show all staff certifications and renewal dates.');
}

function viewTrainingResources() {
    alert('Opening training resources library...\nThis would show all available training materials and documents.');
}

function generateTrainingReport() {
    alert('Generating training compliance report...\nThis would create a comprehensive training analytics report.');
}

function viewTrainingDetails(trainingId) {
    alert(`Viewing details for training: ${trainingId}\nThis would show complete training information and registered participants.`);
}

function editTraining(trainingId) {
    alert(`Editing training session: ${trainingId}\nThis would open the training editing form.`);
}

function registerStaff(trainingId) {
    alert(`Registering staff for training: ${trainingId}\nThis would open staff registration interface.`);
}

function sendReminders(trainingId) {
    alert(`Sending reminders for training: ${trainingId}\nReminders sent to all registered participants.`);
}

function downloadMaterials(trainingId) {
    alert(`Downloading training materials for: ${trainingId}\nCreating download package...`);
}

function viewResourceCategory(category) {
    const categories = {
        'clinical_guidelines': 'Clinical Guidelines',
        'procedure_manuals': 'Procedure Manuals',
        'training_videos': 'Training Videos',
        'certification_courses': 'Certification Courses',
        'safety_protocols': 'Safety Protocols',
        'research_papers': 'Research Papers'
    };
    
    alert(`Opening ${categories[category]} resources...\nThis would show all documents in this category.`);
}

function clearTrainingForm() {
    if (confirm('Are you sure you want to clear the training form? All unsaved data will be lost.')) {
        document.getElementById('trainingScheduleForm').reset();
    }
}

// Initialize training functionality
document.addEventListener('DOMContentLoaded', function() {
    const trainingForm = document.getElementById('trainingScheduleForm');
    if (trainingForm) {
        trainingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const requiredFields = trainingForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'var(--danger)';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate form submission
            alert('Training session scheduled successfully!\nInvitations will be sent to eligible staff members.');
            trainingForm.reset();
        });
    }
    
    // Calculate duration when dates change
    const startDateInput = trainingForm?.querySelector('input[type="datetime-local"]:first-of-type');
    const endDateInput = trainingForm?.querySelector('input[type="datetime-local"]:last-of-type');
    const durationInput = trainingForm?.querySelector('input[placeholder="Auto-calculated"]');
    
    if (startDateInput && endDateInput && durationInput) {
        const calculateDuration = () => {
            if (startDateInput.value && endDateInput.value) {
                const start = new Date(startDateInput.value);
                const end = new Date(endDateInput.value);
                const diffMs = end - start;
                const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                
                if (diffHours < 0) {
                    durationInput.value = 'Invalid dates';
                } else {
                    durationInput.value = `${diffHours}h ${diffMinutes}m`;
                }
            }
        };
        
        startDateInput.addEventListener('change', calculateDuration);
        endDateInput.addEventListener('change', calculateDuration);
    }
});

/* ========= Performance Reviews Functions ========= */
function scheduleBatchReviews() {
    alert('Opening batch review scheduling...\nThis would allow scheduling reviews for multiple employees at once.');
}

function viewReviewTemplates() {
    alert('Opening review templates library...\nThis would show all available performance review forms and templates.');
}

function generatePerformanceReports() {
    alert('Generating performance analytics report...\nThis would create comprehensive performance reports.');
}

function manageGoals() {
    alert('Opening goals management...\nThis would allow setting and tracking employee objectives.');
}

function viewPerformanceReview(employeeId) {
    alert(`Viewing performance review for: ${employeeId}\nThis would show the complete review details and ratings.`);
}

function editPerformanceReview(employeeId) {
    alert(`Editing performance review for: ${employeeId}\nThis would open the review editing form.`);
}

function downloadReview(employeeId) {
    alert(`Downloading performance review for: ${employeeId}\nPDF download started.`);
}

function completeReview(employeeId) {
    if (confirm(`Mark performance review for ${employeeId} as completed?`)) {
        alert(`Performance review completed for: ${employeeId}`);
        // In real application, this would update the review status
    }
}

function sendReminder(employeeId) {
    alert(`Sending reminder for performance review: ${employeeId}\nReminder sent to reviewer and employee.`);
}

function startReview(employeeId) {
    alert(`Starting performance review for: ${employeeId}\nThis would open the review form for completion.`);
}

function escalateReview(employeeId) {
    alert(`Escalating overdue review for: ${employeeId}\nNotification sent to department head.`);
}

function assignReviewer(employeeId) {
    alert(`Assigning reviewer for: ${employeeId}\nThis would open reviewer assignment interface.`);
}

function clearReviewForm() {
    if (confirm('Are you sure you want to clear the performance review form? All unsaved data will be lost.')) {
        document.getElementById('performanceReviewForm').reset();
    }
}

// Initialize performance review functionality
document.addEventListener('DOMContentLoaded', function() {
    const reviewForm = document.getElementById('performanceReviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const requiredFields = reviewForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'var(--danger)';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate form submission
            alert('Performance review scheduled successfully!\nNotifications sent to employee and reviewer.');
            reviewForm.reset();
        });
    }
    
    // Set default dates
    const reviewDate = document.querySelector('#performanceReviewForm input[type="date"]:first-of-type');
    const dueDate = document.querySelector('#performanceReviewForm input[type="date"]:last-of-type');
    
    if (reviewDate && dueDate) {
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);
        const twoWeeks = new Date();
        twoWeeks.setDate(today.getDate() + 14);
        
        reviewDate.value = nextWeek.toISOString().split('T')[0];
        dueDate.value = twoWeeks.toISOString().split('T')[0];
    }
    
    // Add event listener for review cycle change
    const reviewCycle = document.getElementById('reviewCycle');
    if (reviewCycle) {
        reviewCycle.addEventListener('change', function() {
            alert(`Loading performance data for: ${this.options[this.selectedIndex].text}`);
            // In real application, this would reload the performance data
        });
    }
});

/* ========= Rating System Functions ========= */
function submitRating(employeeId, category, rating) {
    // In real application, this would submit the rating to the server
    console.log(`Rating submitted for ${employeeId}: ${category} - ${rating}`);
}

function saveDraftReview(employeeId) {
    alert(`Saving draft review for: ${employeeId}\nProgress saved successfully.`);
}

function submitFinalReview(employeeId) {
    if (confirm('Are you sure you want to submit this performance review? This action cannot be undone.')) {
        alert(`Performance review submitted for: ${employeeId}\nReview is now complete and locked.`);
    }
}

function requestFeedback(employeeId) {
    alert(`Requesting additional feedback for: ${employeeId}\nFeedback requests sent to colleagues.`);
}

/* ========= Financial Analytics Functions ========= */
function generateRevenueReport() {
    alert('Generating comprehensive revenue analysis report...\nThis would create detailed revenue breakdown and trends.');
}

function viewExpenseAnalytics() {
    alert('Opening expense analytics dashboard...\nThis would show detailed cost analysis and spending patterns.');
}

function openProfitabilityDashboard() {
    alert('Opening profitability dashboard...\nThis would show department-wise profit margins and performance metrics.');
}

function generateFinancialForecast() {
    alert('Generating financial forecasts...\nThis would create revenue and expense projections for upcoming periods.');
}

function previewFinancialReport() {
    alert('Generating report preview...\nThis would show a preview of the custom financial report before final generation.');
}

function clearFinancialForm() {
    if (confirm('Are you sure you want to clear the financial report form? All selections will be lost.')) {
        document.getElementById('financialReportForm').reset();
    }
}

// Initialize financial analytics functionality
document.addEventListener('DOMContentLoaded', function() {
    const financialForm = document.getElementById('financialReportForm');
    if (financialForm) {
        financialForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const requiredFields = financialForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'var(--danger)';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate report generation
            alert('Financial report generation started...\nYour report will be ready for download shortly.');
            // In real application, this would trigger report generation
        });
    }
    
    // Add event listener for analysis period change
    const analysisPeriod = document.getElementById('analysisPeriod');
    if (analysisPeriod) {
        analysisPeriod.addEventListener('change', function() {
            const periodText = this.options[this.selectedIndex].text;
            alert(`Loading financial data for: ${periodText}\nUpdating all charts and metrics...`);
            // In real application, this would reload all financial data
        });
    }
    
    // Set default dates for custom range if needed
    const today = new Date();
    const quarterStart = new Date(today.getFullYear(), Math.floor(today.getMonth() / 3) * 3, 1);
    const quarterEnd = new Date(today.getFullYear(), Math.floor(today.getMonth() / 3) * 3 + 3, 0);
    
    // Update period display based on current quarter
    const periodDisplay = document.querySelector('.card-body input[readonly]');
    if (periodDisplay) {
        periodDisplay.value = `${quarterStart.toLocaleDateString()} - ${quarterEnd.toLocaleDateString()}`;
    }
});

/* ========= Advanced Financial Functions ========= */
function exportFinancialData() {
    alert('Exporting financial data to Excel...\nThis would download comprehensive financial data in spreadsheet format.');
}

function comparePeriods() {
    alert('Opening period comparison tool...\nThis would allow comparing financial performance across different time periods.');
}

function analyzeTrends() {
    alert('Analyzing financial trends...\nThis would perform advanced trend analysis on revenue and expense patterns.');
}

function generateExecutiveSummary() {
    alert('Generating executive financial summary...\nThis would create a high-level summary for management review.');
}

function viewBudgetVariance() {
    alert('Opening budget variance analysis...\nThis would compare actual performance against budgeted amounts.');
}

function calculateROI() {
    alert('Calculating return on investment...\nThis would analyze ROI for recent capital expenditures and investments.');
}

/* ========= Reports & Analytics Functions ========= */
function generateFinancialReport() {
    alert('Generating financial report...\nThis would create a comprehensive financial analysis.');
}

function generateOperationalReport() {
    alert('Generating operational report...\nThis would analyze pharmacy efficiency metrics.');
}

function generateClinicalReport() {
    alert('Generating clinical report...\nThis would analyze patient outcomes and quality metrics.');
}

function generateInventoryReport() {
    alert('Generating inventory report...\nThis would analyze stock levels and supply chain efficiency.');
}

function viewReport(reportId) {
    alert(`Viewing report: ${reportId}\nThis would open the report in detailed view.`);
}

function downloadReport(reportId) {
    alert(`Downloading report: ${reportId}\nPreparing PDF download...`);
}

function shareReport(reportId) {
    alert(`Sharing report: ${reportId}\nOpening share options...`);
}

/* ========= Operational Reports Charts ========= */
let operationalCharts = {};

// Sample data for different time ranges
const timelineData = {
    '7d': {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [16.8, 15.2, 14.9, 15.8, 16.1, 14.5, 13.9],
        target: 15
    },
    '30d': {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        data: [17.2, 16.5, 15.8, 15.2],
        target: 15
    },
    '90d': {
        labels: ['Month 1', 'Month 2', 'Month 3'],
        data: [18.5, 16.8, 15.4],
        target: 15
    }
};

function initializeOperationalCharts() {
    // Check if Chart.js is available
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js not loaded yet');
        return;
    }

    // Get initial time range
    const timeRangeSelect = document.getElementById('timelineRange');
    const initialRange = timeRangeSelect ? timeRangeSelect.value : '30d';
    
    // Processing Timeline Chart
    const timelineCtx = document.getElementById('processingTimelineChart');
    if (timelineCtx) {
        const initialData = timelineData[initialRange];
        
        operationalCharts.processingTimeline = new Chart(timelineCtx, {
            type: 'line',
            data: {
                labels: initialData.labels,
                datasets: [{
                    label: 'Avg. Processing Time (min)',
                    data: initialData.data,
                    borderColor: '#0ea5e9',
                    backgroundColor: 'rgba(14, 165, 233, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#0ea5e9',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }, {
                    label: 'Target (min)',
                    data: initialData.labels.map(() => initialData.target),
                    borderColor: '#b91010ff',
                    backgroundColor: 'rgba(233, 14, 14, 0.1)',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    fill: true,
                    tension: 0.2,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: 'var(--text-color)',
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'var(--card-bg)',
                        titleColor: 'var(--text-color)',
                        bodyColor: 'var(--text-color)',
                        // borderColor: 'var(--border-color)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y} min`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'var(--border-color)'
                        },
                        ticks: {
                            color: 'var(--text-muted)'
                        }
                    },
                    y: {
                        beginAtZero: false,
                        min: 10, // Minimum 10 minutes for better visualization
                        max: 20, // Maximum 20 minutes
                        grid: {
                            color: 'var(--border-color)'
                        },
                        ticks: {
                            color: 'var(--text-muted)',
                            callback: function(value) {
                                return value + ' min';
                            }
                        },
                        title: {
                            display: true,
                            text: 'Processing Time (minutes)',
                            color: 'var(--text-color)'
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                animations: {
                    tension: {
                        duration: 1000,
                        easing: 'linear'
                    }
                }
            }
        });
    }

    // Workload Distribution Chart (unchanged)
    const workloadCtx = document.getElementById('workloadDistributionChart');
    if (workloadCtx) {
        operationalCharts.workloadDistribution = new Chart(workloadCtx, {
            type: 'doughnut',
            data: {
                labels: ['Prescription Verification', 'Dispensing', 'Patient Consultation', 'Inventory Management', 'Administrative'],
                datasets: [{
                    data: [35, 25, 20, 15, 5],
                    backgroundColor: [
                        '#0ea5e9',
                        '#10b981',
                        '#f59e0b',
                        '#8b5cf6',
                        '#64748b'
                    ],
                    borderWidth: 2,
                    // borderColor: 'var(--card-bg)',
                    hoverOffset: 15
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '60%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: 'var(--text-color)',
                            font: {
                                size: 11
                            },
                            padding: 15
                        }
                    },
                    tooltip: {
                        backgroundColor: 'var(--card-bg)',
                        titleColor: 'var(--text-color)',
                        bodyColor: 'var(--text-color)',
                        // borderColor: 'var(--border-color)',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.parsed}%`;
                            }
                        }
                    }
                }
            }
        });
    }
}

function updateTimelineChart() {
    const range = document.getElementById('timelineRange').value;
    const chart = operationalCharts.processingTimeline;
    
    if (!chart) {
        console.warn('Timeline chart not initialized');
        return;
    }

    const newData = timelineData[range];
    
    if (!newData) {
        console.warn('No data found for range:', range);
        return;
    }

    // Update chart data with smooth transition
    chart.data.labels = newData.labels;
    chart.data.datasets[0].data = newData.data;
    chart.data.datasets[1].data = newData.labels.map(() => newData.target);
    
    // Update y-axis scale based on data range
    const maxDataValue = Math.max(...newData.data);
    const minDataValue = Math.min(...newData.data);
    
    chart.options.scales.y.min = Math.floor(minDataValue - 2);
    chart.options.scales.y.max = Math.ceil(maxDataValue + 2);
    
    // Add animation for smooth transition
    chart.update('active');
    
    // Update the chart subtitle or info if needed
    updateChartInfo(range);
}

function updateChartInfo(range) {
    const infoText = document.getElementById('chartInfo');
    if (!infoText) return;
    
    const rangeText = {
        '7d': 'Last 7 Days',
        '30d': 'Last 30 Days', 
        '90d': 'Last 90 Days'
    }[range] || range;
    
    infoText.textContent = `Showing data for ${rangeText}`;
}

// Enhanced initialization with range selector
function setupTimelineRangeSelector() {
    const rangeSelector = document.getElementById('timelineRange');
    if (rangeSelector) {
        rangeSelector.addEventListener('change', updateTimelineChart);
    }
}

// Modified initialization function
function loadChartJSForOperational() {
    if (typeof Chart === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = function() {
            initializeOperationalCharts();
            setupTimelineRangeSelector();
        };
        document.head.appendChild(script);
    } else {
        initializeOperationalCharts();
        setupTimelineRangeSelector();
    }
}

// Update the existing setup function
function setupOperationalReportsPage() {
    // Check if operational reports page is active on load
    const operationalPage = document.getElementById('operational-reports');
    if (operationalPage && operationalPage.classList.contains('active')) {
        loadChartJSForOperational();
    }

    // Handle page navigation
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a, .dropdown-menu a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const pageId = this.getAttribute('data-page');
            if (pageId === 'operational-reports') {
                // Wait for page to become active
                setTimeout(() => {
                    loadChartJSForOperational();
                }, 300);
            }
        });
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setupOperationalReportsPage();
});

/* ========= Quality Metrics Charts & Functions ========= */
let qualityCharts = {};

// Sample data for quality metrics
const qualityData = {
    '30d': {
        medicationErrors: [0.15, 0.12, 0.10, 0.08],
        satisfaction: [93, 94, 95, 96],
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
    },
    '90d': {
        medicationErrors: [0.18, 0.16, 0.14, 0.12, 0.10, 0.09, 0.08, 0.08, 0.07, 0.08, 0.07, 0.08],
        satisfaction: [92, 93, 93, 94, 94, 95, 95, 95, 96, 96, 96, 96],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    '1y': {
        medicationErrors: [0.25, 0.22, 0.20, 0.18, 0.16, 0.14, 0.12, 0.10, 0.09, 0.08, 0.08, 0.08],
        satisfaction: [90, 91, 92, 92, 93, 93, 94, 94, 95, 95, 96, 96],
        labels: ['Q1', 'Q2', 'Q3', 'Q4']
    }
};

function initializeQualityCharts() {
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js not loaded yet');
        return;
    }

    const timeRange = document.getElementById('qualityTimeRange')?.value || '90d';
    const data = qualityData[timeRange];

    // Medication Errors Chart
    const errorsCtx = document.getElementById('medicationErrorsChart');
    if (errorsCtx) {
        qualityCharts.medicationErrors = new Chart(errorsCtx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Medication Error Rate (%)',
                    data: data.medicationErrors,
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Target (0.1%)',
                    data: data.labels.map(() => 0.1),
                    borderColor: '#10b981',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y}%`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 0.3,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    // Error Distribution Chart
    const distributionCtx = document.getElementById('errorDistributionChart');
    if (distributionCtx) {
        qualityCharts.errorDistribution = new Chart(distributionCtx, {
            type: 'doughnut',
            data: {
                labels: ['Dispensing', 'Labeling', 'Verification', 'Documentation', 'Other'],
                datasets: [{
                    data: [45, 20, 25, 8, 2],
                    backgroundColor: [
                        '#ef4444',
                        '#f59e0b',
                        '#0ea5e9',
                        '#8b5cf6',
                        '#64748b'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '60%',
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Satisfaction Trend Chart
    const satisfactionCtx = document.getElementById('satisfactionTrendChart');
    if (satisfactionCtx) {
        qualityCharts.satisfactionTrend = new Chart(satisfactionCtx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Patient Satisfaction (%)',
                    data: data.satisfaction,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        min: 85,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }
}

function updateQualityCharts() {
    const range = document.getElementById('qualityTimeRange').value;
    const data = qualityData[range];
    
    // Update medication errors chart
    if (qualityCharts.medicationErrors) {
        qualityCharts.medicationErrors.data.labels = data.labels;
        qualityCharts.medicationErrors.data.datasets[0].data = data.medicationErrors;
        qualityCharts.medicationErrors.data.datasets[1].data = data.labels.map(() => 0.1);
        qualityCharts.medicationErrors.update();
    }
    
    // Update satisfaction chart
    if (qualityCharts.satisfactionTrend) {
        qualityCharts.satisfactionTrend.data.labels = data.labels;
        qualityCharts.satisfactionTrend.data.datasets[0].data = data.satisfaction;
        qualityCharts.satisfactionTrend.update();
    }
    
    // Update info text
    const infoText = document.getElementById('safetyChartInfo');
    if (infoText) {
        const rangeText = {
            '30d': 'Last 30 Days',
            '90d': 'Last 90 Days',
            '1y': 'Last Year'
        }[range] || range;
        infoText.textContent = rangeText;
    }
}

function downloadQualityChart(chartId) {
    const chart = qualityCharts[chartId];
    if (chart) {
        const link = document.createElement('a');
        link.download = `${chartId}-${new Date().toISOString().split('T')[0]}.png`;
        link.href = chart.toBase64Image();
        link.click();
    }
}

// Initialize quality metrics page
function setupQualityMetricsPage() {
    const qualityPage = document.getElementById('quality-metrics');
    if (qualityPage && qualityPage.classList.contains('active')) {
        loadChartJSForQuality();
    }

    // Handle page navigation
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a, .dropdown-menu a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            const pageId = this.getAttribute('data-page');
            if (pageId === 'quality-metrics') {
                setTimeout(() => {
                    loadChartJSForQuality();
                }, 300);
            }
        });
    });
}

function loadChartJSForQuality() {
    if (typeof Chart === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = function() {
            initializeQualityCharts();
            setupQualityEventListeners();
        };
        document.head.appendChild(script);
    } else {
        initializeQualityCharts();
        setupQualityEventListeners();
    }
}

function setupQualityEventListeners() {
    const timeRangeSelector = document.getElementById('qualityTimeRange');
    if (timeRangeSelector) {
        timeRangeSelector.addEventListener('change', updateQualityCharts);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setupQualityMetricsPage();
});

/* ========= Compliance Reports Charts & Functions ========= */
let complianceCharts = {};

// Sample data for compliance metrics
const complianceData = {
    '30d': {
        complianceRate: [97.5, 97.8, 98.1, 98.3, 98.5],
        categories: [100, 95, 100, 88, 92, 98, 96],
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5']
    },
    '90d': {
        complianceRate: [96.2, 96.8, 97.2, 97.5, 97.8, 98.0, 98.2, 98.3, 98.4, 98.4, 98.5, 98.5],
        categories: [100, 95, 100, 88, 92, 98, 96],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    '1y': {
        complianceRate: [94.5, 95.2, 95.8, 96.3, 96.8, 97.2, 97.5, 97.8, 98.0, 98.2, 98.3, 98.5],
        categories: [100, 95, 100, 88, 92, 98, 96],
        labels: ['Q1', 'Q2', 'Q3', 'Q4']
    }
};

function initializeComplianceCharts() {
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js not loaded yet');
        return;
    }

    const timeRange = document.getElementById('complianceTimeRange')?.value || '90d';
    const data = complianceData[timeRange];

    // Compliance Trend Chart
    const trendCtx = document.getElementById('complianceTrendChart');
    if (trendCtx) {
        complianceCharts.complianceTrend = new Chart(trendCtx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Overall Compliance Rate (%)',
                    data: data.complianceRate,
                    borderColor: '#0ea5e9',
                    backgroundColor: 'rgba(14, 165, 233, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#0ea5e9',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }, {
                    label: 'Target (95%)',
                    data: data.labels.map(() => 95),
                    borderColor: '#10b981',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    fill: false,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y}%`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        min: 90,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    // Compliance Category Chart
    const categoryCtx = document.getElementById('complianceCategoryChart');
    if (categoryCtx) {
        complianceCharts.complianceCategory = new Chart(categoryCtx, {
            type: 'bar',
            data: {
                labels: ['HIPAA', 'DEA', 'State Board', 'Joint Commission', 'OSHA', 'FDA', 'CMS'],
                datasets: [{
                    label: 'Compliance Score (%)',
                    data: data.categories,
                    backgroundColor: [
                        '#10b981',
                        '#10b981',
                        '#10b981',
                        '#f59e0b',
                        '#10b981',
                        '#10b981',
                        '#10b981'
                    ],
                    borderWidth: 2,
                    borderRadius: 6,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        min: 80,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }
}

function updateComplianceCharts() {
    const range = document.getElementById('complianceTimeRange').value;
    const data = complianceData[range];
    
    // Update trend chart
    if (complianceCharts.complianceTrend) {
        complianceCharts.complianceTrend.data.labels = data.labels;
        complianceCharts.complianceTrend.data.datasets[0].data = data.complianceRate;
        complianceCharts.complianceTrend.data.datasets[1].data = data.labels.map(() => 95);
        complianceCharts.complianceTrend.update();
    }
    
    // Update category chart
    if (complianceCharts.complianceCategory) {
        complianceCharts.complianceCategory.data.datasets[0].data = data.categories;
        complianceCharts.complianceCategory.update();
    }
    
    // Update info text
    const infoText = document.getElementById('complianceChartInfo');
    if (infoText) {
        const rangeText = {
            '30d': 'Last 30 Days',
            '90d': 'Last 90 Days',
            '1y': 'Last Year'
        }[range] || range;
        infoText.textContent = rangeText;
    }
}

function downloadComplianceChart(chartId) {
    const chart = complianceCharts[chartId];
    if (chart) {
        const link = document.createElement('a');
        link.download = `${chartId}-${new Date().toISOString().split('T')[0]}.png`;
        link.href = chart.toBase64Image();
        link.click();
    }
}

// Compliance action functions
function viewComplianceReport(reportId) {
    alert(`Viewing compliance report: ${reportId}`);
    // Implementation would open report viewer
}

function generateRemediationPlan(standard) {
    alert(`Generating remediation plan for: ${standard}`);
    // Implementation would open remediation planner
}

function scheduleAudit(auditType) {
    alert(`Scheduling audit for: ${auditType}`);
    // Implementation would open audit scheduler
}

// Initialize compliance page
function setupComplianceReportsPage() {
    const compliancePage = document.getElementById('compliance-reports');
    if (compliancePage && compliancePage.classList.contains('active')) {
        loadChartJSForCompliance();
    }

    // Handle page navigation
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a, .dropdown-menu a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            const pageId = this.getAttribute('data-page');
            if (pageId === 'compliance-reports') {
                setTimeout(() => {
                    loadChartJSForCompliance();
                }, 300);
            }
        });
    });
}

function loadChartJSForCompliance() {
    if (typeof Chart === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = function() {
            initializeComplianceCharts();
            setupComplianceEventListeners();
        };
        document.head.appendChild(script);
    } else {
        initializeComplianceCharts();
        setupComplianceEventListeners();
    }
}

function setupComplianceEventListeners() {
    const timeRangeSelector = document.getElementById('complianceTimeRange');
    if (timeRangeSelector) {
        timeRangeSelector.addEventListener('change', updateComplianceCharts);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setupComplianceReportsPage();
});

// Risk Assessment Chart Implementation
document.addEventListener('DOMContentLoaded', function() {
    const riskCtx = document.getElementById('riskAssessmentChart').getContext('2d');
    
    const riskChart = new Chart(riskCtx, {
        type: 'bar',
        data: {
            labels: ['Cybersecurity', 'Operations', 'Compliance', 'Financial', 'Reputational'],
            datasets: [{
                label: 'Risk Level',
                data: [85, 65, 45, 30, 25],
                backgroundColor: [
                    'rgba(239, 68, 68, 0.8)',    // High risk - red
                    'rgba(245, 158, 11, 0.8)',   // Medium-high - amber
                    'rgba(59, 130, 246, 0.8)',   // Medium - blue
                    'rgba(34, 197, 94, 0.8)',    // Low-medium - green
                    'rgba(156, 163, 175, 0.8)'   // Low - gray
                ],
                borderColor: [
                    'rgb(239, 68, 68)',
                    'rgb(245, 158, 11)',
                    'rgb(59, 130, 246)',
                    'rgb(34, 197, 94)',
                    'rgb(156, 163, 175)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Risk Score: ${context.parsed.y}/100`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Risk Score (0-100)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Risk Categories'
                    }
                }
            }
        }
    });

    // Tab switching functionality
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to current tab and content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
});

// Patient Statistics JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all charts
    initializeCharts();
    
    // Set up tab functionality
    setupTabs();
    
    // Set up event listeners
    setupEventListeners();
    
    // Set up time range selector
    setupTimeRangeSelector();
});

// Initialize all charts
function initializeCharts() {
    // Age Distribution Chart (Bar Chart)
    const ageDistributionCtx = document.getElementById('ageDistributionChart').getContext('2d');
    const ageDistributionChart = new Chart(ageDistributionCtx, {
        type: 'bar',
        data: {
            labels: ['0-18', '19-30', '31-45', '46-60', '61-75', '75+'],
            datasets: [{
                label: 'Number of Patients',
                data: [320, 580, 720, 650, 420, 157],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.7)',
                    'rgba(16, 185, 129, 0.7)',
                    'rgba(245, 158, 11, 0.7)',
                    'rgba(239, 68, 68, 0.7)',
                    'rgba(139, 92, 246, 0.7)',
                    'rgba(14, 165, 233, 0.7)'
                ],
                borderColor: [
                    'rgb(59, 130, 246)',
                    'rgb(16, 185, 129)',
                    'rgb(245, 158, 11)',
                    'rgb(239, 68, 68)',
                    'rgb(139, 92, 246)',
                    'rgb(14, 165, 233)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Patients: ${context.parsed.y}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Patients'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Age Groups'
                    }
                }
            }
        }
    });

    // Gender Distribution Chart (Doughnut Chart)
    const genderDistributionCtx = document.getElementById('genderDistributionChart').getContext('2d');
    const genderDistributionChart = new Chart(genderDistributionCtx, {
        type: 'doughnut',
        data: {
            labels: ['Female', 'Male', 'Other/Unspecified'],
            datasets: [{
                data: [1520, 1247, 80],
                backgroundColor: [
                    'rgba(239, 68, 68, 0.7)',
                    'rgba(59, 130, 246, 0.7)',
                    'rgba(16, 185, 129, 0.7)'
                ],
                borderColor: [
                    'rgb(239, 68, 68)',
                    'rgb(59, 130, 246)',
                    'rgb(16, 185, 129)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((context.parsed / total) * 100);
                            return `${context.label}: ${context.parsed} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });

    // Geographic Distribution Chart (Bar Chart)
    const geographicCtx = document.getElementById('geographicChart').getContext('2d');
    const geographicChart = new Chart(geographicCtx, {
        type: 'bar',
        data: {
            labels: ['90210', '90024', '90212', '90025', '90035', '90034', '90064', '90067', '90069', '90046'],
            datasets: [{
                label: 'Patient Count',
                data: [324, 287, 245, 198, 176, 162, 148, 135, 121, 110],
                backgroundColor: 'rgba(59, 130, 246, 0.7)',
                borderColor: 'rgb(59, 130, 246)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Patients'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'ZIP Codes'
                    }
                }
            }
        }
    });

    // Conditions Chart (Bar Chart)
    const conditionsCtx = document.getElementById('conditionsChart').getContext('2d');
    const conditionsChart = new Chart(conditionsCtx, {
        type: 'bar',
        data: {
            labels: ['Hypertension', 'Diabetes', 'Hyperlipidemia', 'Asthma/COPD', 'Depression/Anxiety', 'Arthritis', 'Heart Disease', 'Obesity'],
            datasets: [{
                label: 'Percentage of Patients',
                data: [32, 18, 26, 12, 22, 15, 8, 24],
                backgroundColor: 'rgba(139, 92, 246, 0.7)',
                borderColor: 'rgb(139, 92, 246)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y}% of patients`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 35,
                    title: {
                        display: true,
                        text: 'Percentage of Patients'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });

    // Prescription Trend Chart (Line Chart)
    const prescriptionTrendCtx = document.getElementById('prescriptionTrendChart').getContext('2d');
    const prescriptionTrendChart = new Chart(prescriptionTrendCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Prescriptions',
                data: [580, 620, 590, 610, 640, 670, 650, 680, 720, 710, 690, 730],
                borderColor: 'rgb(16, 185, 129)',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Prescriptions'
                    }
                }
            }
        }
    });

    // Outcomes Chart (Line Chart)
    const outcomesCtx = document.getElementById('outcomesChart').getContext('2d');
    const outcomesChart = new Chart(outcomesCtx, {
        type: 'line',
        data: {
            labels: ['Q1 2022', 'Q2 2022', 'Q3 2022', 'Q4 2022', 'Q1 2023', 'Q2 2023', 'Q3 2023'],
            datasets: [
                {
                    label: 'Patient Satisfaction',
                    data: [88, 90, 91, 92, 93, 94, 94],
                    borderColor: 'rgb(16, 185, 129)',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Readmission Rate',
                    data: [15.2, 14.8, 14.1, 13.5, 13.2, 12.8, 12.4],
                    borderColor: 'rgb(239, 68, 68)',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Preventive Care Rate',
                    data: [72, 75, 77, 79, 81, 83, 85],
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Percentage'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

// Set up tab functionality
function setupTabs() {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Set up event listeners
function setupEventListeners() {
    // Generate Report Button
    const generateReportBtn = document.getElementById('generatePatientReportBtn');
    if (generateReportBtn) {
        generateReportBtn.addEventListener('click', function() {
            generatePatientReport();
        });
    }
    
    // Export Data Button
    const exportDataBtn = document.querySelector('.btn-outline');
    if (exportDataBtn) {
        exportDataBtn.addEventListener('click', function() {
            exportPatientData();
        });
    }
    
    // View Campaign Button in Alert
    const viewCampaignBtn = document.querySelector('.alert-info .btn');
    if (viewCampaignBtn) {
        viewCampaignBtn.addEventListener('click', function() {
            viewVaccinationCampaign();
        });
    }
    
    // Download Chart Button
    const downloadButtons = document.querySelectorAll('[onclick*="downloadChart"]');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const chartId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            downloadChart(chartId);
        });
    });
}

// Set up time range selector
function setupTimeRangeSelector() {
    const timeRangeSelector = document.getElementById('patientTimeRange');
    if (timeRangeSelector) {
        timeRangeSelector.addEventListener('change', function() {
            updateChartsByTimeRange(this.value);
        });
    }
}

// Generate Patient Report
function generatePatientReport() {
    // Show loading state
    const originalText = generateReportBtn.innerHTML;
    generateReportBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    generateReportBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // In a real application, this would fetch data and generate a report
        alert('Patient statistics report generated successfully!');
        
        // Reset button
        generateReportBtn.innerHTML = originalText;
        generateReportBtn.disabled = false;
    }, 1500);
}

// Export Patient Data
function exportPatientData() {
    // Show loading state
    const exportBtn = document.querySelector('.btn-outline');
    const originalText = exportBtn.innerHTML;
    exportBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Exporting...';
    exportBtn.disabled = true;
    
    // Simulate export process
    setTimeout(() => {
        // In a real application, this would prepare and download data
        alert('Patient data exported successfully!');
        
        // Reset button
        exportBtn.innerHTML = originalText;
        exportBtn.disabled = false;
    }, 2000);
}

// View Vaccination Campaign
function viewVaccinationCampaign() {
    alert('Opening influenza vaccination campaign details...');
    // In a real application, this would navigate to the campaign page
}

// Download Chart
function downloadChart(chartId) {
    const canvas = document.getElementById(chartId);
    if (canvas) {
        const link = document.createElement('a');
        link.download = `${chartId}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    }
}

// Update Charts by Time Range
function updateChartsByTimeRange(timeRange) {
    // Show loading state
    const timeRangeSelector = document.getElementById('patientTimeRange');
    const originalValue = timeRangeSelector.value;
    timeRangeSelector.disabled = true;
    
    // Simulate data fetching based on time range
    setTimeout(() => {
        // In a real application, this would fetch new data based on the time range
        // and update the charts accordingly
        
        // For demonstration, just show an alert
        let rangeText = '';
        switch(timeRange) {
            case '7d':
                rangeText = 'Last 7 Days';
                break;
            case '30d':
                rangeText = 'Last 30 Days';
                break;
            case '90d':
                rangeText = 'Last 90 Days';
                break;
            case '1y':
                rangeText = 'Last Year';
                break;
        }
        
        console.log(`Charts updated for: ${rangeText}`);
        
        // Reset selector
        timeRangeSelector.disabled = false;
    }, 1000);
}

// Additional utility functions for the page

// Refresh Insurance Data
function refreshInsuranceData() {
    const refreshBtn = document.querySelector('.card-header .btn-outline');
    if (refreshBtn) {
        const originalText = refreshBtn.innerHTML;
        refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
        
        setTimeout(() => {
            // Simulate data refresh
            alert('Insurance data refreshed successfully!');
            refreshBtn.innerHTML = originalText;
        }, 1500);
    }
}

// Update Vaccination Rates
function updateVaccinationRates() {
    const updateBtn = document.querySelector('[data-tab="clinical-metrics"] .btn');
    if (updateBtn) {
        const originalText = updateBtn.innerHTML;
        updateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating...';
        
        setTimeout(() => {
            // Simulate data update
            alert('Vaccination rates updated with latest data!');
            updateBtn.innerHTML = originalText;
        }, 1200);
    }
}

// View Medication Classes
function viewAllMedicationClasses() {
    alert('Opening complete medication classes list...');
    // In a real application, this would navigate to a detailed medication page
}

// Generate Adherence Report
function generateAdherenceReport() {
    alert('Generating medication adherence report...');
    // In a real application, this would generate and display a detailed report
}

// View Survey Results
function viewSurveyResults() {
    alert('Opening patient satisfaction survey results...');
    // In a real application, this would navigate to survey results
}

// Generate Discharge Report
function generateDischargeReport() {
    alert('Generating hospital discharge report...');
    // In a real application, this would generate a detailed discharge report
}

// Create New Campaign
function createNewCampaign() {
    alert('Opening new patient outreach campaign creation form...');
    // In a real application, this would open a campaign creation modal/form
}

// View Alert Settings
function viewAlertSettings() {
    alert('Opening performance alert settings...');
    // In a real application, this would navigate to alert settings
}

// View Patients for Screening
function viewPatientsForScreening() {
    alert('Opening list of patients overdue for colorectal cancer screening...');
    // In a real application, this would filter and display the patient list
}

// Implement Best Practice
function implementBestPractice() {
    alert('Implementing medication therapy management for heart failure patients...');
    // In a real application, this would initiate the implementation process
}

/* ========= User Management Functions ========= */
function toggleSelectAllUsers() {
    const selectAll = document.getElementById('selectAllUsers');
    const checkboxes = document.querySelectorAll('.user-checkbox');
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAll.checked;
    });
}

function viewUserProfile(userId) {
    alert(`Viewing user profile: ${userId}\nThis would open detailed user information and activity.`);
}

function editUser(userId) {
    alert(`Editing user: ${userId}\nThis would open user edit form.`);
}

function manageUserAccess(userId) {
    alert(`Managing access for user: ${userId}\nThis would open access control settings.`);
}

function activateUser(userId) {
    if (confirm(`Are you sure you want to activate user ${userId}?`)) {
        alert(`User ${userId} activated successfully.`);
    }
}

function bulkUserImport() {
    alert('Opening bulk user import interface...\nThis would allow importing multiple users via CSV/Excel.');
}

function generateUserReports() {
    alert('Generating user management reports...\nThis would create comprehensive user analytics.');
}

function passwordPolicyReview() {
    alert('Opening password policy compliance review...\nThis would check all user password compliance.');
}

function userAccessReview() {
    alert('Initiating user access review...\nThis would audit user permissions and access levels.');
}

function searchUsers() {
    const searchTerm = document.getElementById('userSearch').value.toLowerCase();
    const statusFilter = document.getElementById('userStatusFilter').value;
    const departmentFilter = document.getElementById('userDepartmentFilter').value;
    const roleFilter = document.getElementById('userRoleFilter').value;
    
    const rows = document.querySelectorAll('#usersTable tbody tr');
    let visibleCount = 0;
    
    rows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        const statusBadge = row.querySelector('.badge').textContent.toLowerCase();
        const department = row.cells[3].textContent.toLowerCase();
        const role = row.cells[4].textContent.toLowerCase();
        
        const matchesSearch = !searchTerm || rowText.includes(searchTerm);
        const matchesStatus = !statusFilter || statusBadge.includes(statusFilter);
        const matchesDepartment = !departmentFilter || department.includes(departmentFilter);
        const matchesRole = !roleFilter || role.includes(roleFilter);
        
        if (matchesSearch && matchesStatus && matchesDepartment && matchesRole) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    // Update visible count display
    const countDisplay = document.querySelector('#user-management .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = `Showing ${visibleCount} of 156 users`;
    }
}

function clearUserFilters() {
    document.getElementById('userSearch').value = '';
    document.getElementById('userStatusFilter').value = '';
    document.getElementById('userDepartmentFilter').value = '';
    document.getElementById('userRoleFilter').value = '';
    
    // Show all rows
    const rows = document.querySelectorAll('#usersTable tbody tr');
    rows.forEach(row => {
        row.style.display = '';
    });
    
    // Reset count display
    const countDisplay = document.querySelector('#user-management .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = 'Showing 1-10 of 156 users';
    }
}

/* ========= Access Control Functions ========= */
function viewRoleDetails(roleId) {
    alert(`Viewing role details: ${roleId}\nThis would show comprehensive role information and permissions.`);
}

function exportPermissionsMatrix() {
    alert('Exporting permissions matrix...\nThis would generate a comprehensive permissions report.');
}

/* ========= Backup & Recovery Functions ========= */
function runBackupNow() {
    if (confirm('Are you sure you want to run a backup now? This may impact system performance.')) {
        alert('Initiating immediate backup...\nBackup job started successfully.');
        // Simulate backup progress
        simulateBackupProgress();
    }
}

function simulateBackupProgress() {
    let progress = 0;
    const interval = setInterval(() => {
        progress += 5;
        console.log(`Backup progress: ${progress}%`);
        if (progress >= 100) {
            clearInterval(interval);
            alert('Backup completed successfully!');
        }
    }, 500);
}

/* ========= Audit Logs Functions ========= */
function viewAuditDetails(auditId) {
    alert(`Viewing audit details: ${auditId}\nThis would show comprehensive audit event information.`);
}

function searchAuditLogs() {
    const searchTerm = document.getElementById('auditLogSearch').value.toLowerCase();
    const eventType = document.getElementById('eventTypeFilter').value;
    const severity = document.getElementById('severityFilter').value;
    const user = document.getElementById('userFilter').value;
    const resource = document.getElementById('resourceFilter').value;
    
    const rows = document.querySelectorAll('#auditLogsTable tbody tr');
    let visibleCount = 0;
    
    rows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        const eventTypeCell = row.cells[2].textContent.toLowerCase();
        const statusBadge = row.cells[6].textContent.toLowerCase();
        const userCell = row.cells[1].textContent.toLowerCase();
        const resourceCell = row.cells[4].textContent.toLowerCase();
        
        const matchesSearch = !searchTerm || rowText.includes(searchTerm);
        const matchesEventType = !eventType || eventTypeCell.includes(eventType);
        const matchesSeverity = !severity || statusBadge.includes(severity);
        const matchesUser = !user || userCell.includes(user);
        const matchesResource = !resource || resourceCell.includes(resource);
        
        if (matchesSearch && matchesEventType && matchesSeverity && matchesUser && matchesResource) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    // Update visible count display
    const countDisplay = document.querySelector('#audit-logs .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = `Showing ${visibleCount} of 24,856 events`;
    }
}

function clearAuditFilters() {
    document.getElementById('auditLogSearch').value = '';
    document.getElementById('eventTypeFilter').value = '';
    document.getElementById('severityFilter').value = '';
    document.getElementById('userFilter').value = '';
    document.getElementById('resourceFilter').value = '';
    document.getElementById('ipFilter').value = '';
    document.getElementById('auditStartDate').value = '';
    document.getElementById('auditEndDate').value = '';
    
    // Show all rows
    const rows = document.querySelectorAll('#auditLogsTable tbody tr');
    rows.forEach(row => {
        row.style.display = '';
    });
    
    // Reset count display
    const countDisplay = document.querySelector('#audit-logs .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = 'Showing 1-10 of 24,856 events';
    }
}

// Initialize page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set default dates for audit logs
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7); // Last 7 days
    
    if (document.getElementById('auditStartDate')) {
        document.getElementById('auditStartDate').value = startDate.toISOString().slice(0, 16);
        document.getElementById('auditEndDate').value = endDate.toISOString().slice(0, 16);
    }
    
    // Add search functionality
    const userSearch = document.getElementById('userSearch');
    if (userSearch) {
        userSearch.addEventListener('input', searchUsers);
    }
    
    const auditSearch = document.getElementById('auditLogSearch');
    if (auditSearch) {
        auditSearch.addEventListener('input', searchAuditLogs);
    }
    
    // Add modal functionality for Add User button
    const addUserBtn = document.getElementById('addUserBtn');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', function() {
            alert('Opening Add User modal...\nThis would open a comprehensive user creation form.');
        });
    }
    
    // Add modal functionality for Add Role button
    const addRoleBtn = document.getElementById('addRoleBtn');
    if (addRoleBtn) {
        addRoleBtn.addEventListener('click', function() {
            alert('Opening Create Role modal...\nThis would open role creation and configuration.');
        });
    }
    
    // Add functionality for Run Backup button
    const runBackupBtn = document.getElementById('runBackupBtn');
    if (runBackupBtn) {
        runBackupBtn.addEventListener('click', runBackupNow);
    }
    
    // Add functionality for Export Logs button
    const exportLogsBtn = document.getElementById('exportLogsBtn');
    if (exportLogsBtn) {
        exportLogsBtn.addEventListener('click', function() {
            alert('Exporting audit logs...\nThis would generate downloadable log files.');
        });
    }
});

// User Management JavaScript Functions
function toggleSelectAllUsers() {
    const selectAll = document.getElementById('selectAllUsers');
    const checkboxes = document.querySelectorAll('.user-checkbox');
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAll.checked;
    });
}

function viewUserProfile(userId) {
    alert(`Viewing user profile: ${userId}\nThis would open detailed user information and activity.`);
}

function editUser(userId) {
    alert(`Editing user: ${userId}\nThis would open user edit form.`);
}

function manageUserAccess(userId) {
    alert(`Managing access for user: ${userId}\nThis would open permissions management.`);
}

function enable2FA(userId) {
    if (confirm(`Enable Two-Factor Authentication for user ${userId}?`)) {
        alert(`2FA enabled for user: ${userId}\nUser will be prompted to setup on next login.`);
    }
}

function resetPassword(userId) {
    if (confirm(`Reset password for user ${userId}? A temporary password will be sent via email.`)) {
        alert(`Password reset initiated for user: ${userId}\nTemporary password sent to registered email.`);
    }
}

function auditUser(userId) {
    alert(`Running security audit for user: ${userId}\nThis would generate comprehensive access review.`);
}

function activateUser(userId) {
    if (confirm(`Activate user account ${userId}?`)) {
        alert(`User ${userId} activated successfully.\nUser can now access the system.`);
    }
}

function sendReminder(userId) {
    alert(`Sending activation reminder to user: ${userId}\nReminder email/SMS sent.`);
}

function bulkUserImport() {
    alert('Opening bulk user import interface...\nSupport for CSV and Excel formats.');
}

function runUserAudit() {
    alert('Initiating comprehensive user access audit...\nThis may take several minutes.');
}

function sendBulkNotifications() {
    alert('Opening bulk notification manager...\nSend alerts to multiple users simultaneously.');
}

function generateUserReports() {
    alert('Generating user management reports...\nCreating comprehensive analytics and statistics.');
}

function searchUsers() {
    const searchTerm = document.getElementById('userSearch').value.toLowerCase();
    const statusFilter = document.getElementById('userStatusFilter').value;
    const deptFilter = document.getElementById('userDepartmentFilter').value;
    const roleFilter = document.getElementById('userRoleFilter').value;
    
    const rows = document.querySelectorAll('#usersTable tbody tr');
    let visibleCount = 0;
    
    rows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        const statusBadge = row.querySelector('td:nth-child(7) .badge').textContent.toLowerCase();
        const department = row.cells[3].textContent.toLowerCase();
        const role = row.cells[4].textContent.toLowerCase();
        
        const matchesSearch = !searchTerm || rowText.includes(searchTerm);
        const matchesStatus = !statusFilter || statusBadge.includes(statusFilter);
        const matchesDept = !deptFilter || department.includes(deptFilter);
        const matchesRole = !roleFilter || role.includes(roleFilter);
        
        if (matchesSearch && matchesStatus && matchesDept && matchesRole) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    // Update visible count display
    const countDisplay = document.querySelector('#user-management .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = `Showing ${visibleCount} of 247 users`;
    }
}

function clearUserFilters() {
    document.getElementById('userSearch').value = '';
    document.getElementById('userStatusFilter').value = '';
    document.getElementById('userDepartmentFilter').value = '';
    document.getElementById('userRoleFilter').value = '';
    
    // Show all rows
    const rows = document.querySelectorAll('#usersTable tbody tr');
    rows.forEach(row => {
        row.style.display = '';
    });
    
    // Reset count display
    const countDisplay = document.querySelector('#user-management .card-header .text-muted');
    if (countDisplay) {
        countDisplay.textContent = 'Showing 1-10 of 247 users';
    }
}

function executeBulkUserAction() {
    const selectedAction = document.getElementById('bulkUserAction').value;
    const selectedUsers = document.querySelectorAll('.user-checkbox:checked');
    
    if (selectedUsers.length === 0) {
        alert('Please select at least one user to perform bulk action.');
        return;
    }
    
    if (!selectedAction) {
        alert('Please select a bulk action to perform.');
        return;
    }
    
    alert(`Executing ${selectedAction} for ${selectedUsers.length} users...\nThis action will be processed in the background.`);
}

// Initialize user management functionality
document.addEventListener('DOMContentLoaded', function() {
    const userSearch = document.getElementById('userSearch');
    if (userSearch) {
        userSearch.addEventListener('input', searchUsers);
    }
    
    // Add event listeners to filter dropdowns
    const userFilters = ['userStatusFilter', 'userDepartmentFilter', 'userRoleFilter'];
    userFilters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', searchUsers);
        }
    });
    
    // Add User Modal trigger
    const addUserBtn = document.getElementById('addUserBtn');
    const addUserModal = document.getElementById('addUserModal');
    
    if (addUserBtn && addUserModal) {
        addUserBtn.addEventListener('click', () => {
            addUserModal.style.display = 'flex';
        });
    }
    
    // Set default start date to today
    const startDate = document.getElementById('userStartDate');
    if (startDate) {
        startDate.value = new Date().toISOString().split('T')[0];
    }
});

// Access Control JavaScript Functions

// Role Management Functions
function editRole(roleId) {
    alert(`Editing role: ${roleId}\nThis would open role configuration interface.`);
}

function manageRoleUsers(roleId) {
    alert(`Managing users for role: ${roleId}\nThis would open user assignment interface.`);
}

function auditRole(roleId) {
    alert(`Running security audit for role: ${roleId}\nChecking permissions and compliance.`);
}

function cloneRole(roleId) {
    if (confirm(`Create a copy of role ${roleId}?`)) {
        alert(`Role ${roleId} cloned successfully.\nYou can now modify the copy.`);
    }
}

function reviewRole(roleId) {
    alert(`Initiating compliance review for role: ${roleId}\nThis would start formal review process.`);
}

// Policy Management Functions
function editPolicy(policyId) {
    alert(`Editing access policy: ${policyId}\nThis would open policy configuration.`);
}

function testPolicy(policyId) {
    alert(`Testing access policy: ${policyId}\nRunning simulation with test scenarios.`);
}

function simulateEmergency(policyId) {
    if (confirm(`Initiate emergency access simulation for ${policyId}? This will test break-glass procedures.`)) {
        alert(`Emergency simulation started for ${policyId}.\nMonitoring access patterns and audit trails.`);
    }
}

// Quick Action Functions
function runSecurityAudit() {
    alert('Initiating comprehensive security audit...\nThis will review all access controls and policies.');
}

function exportAccessPolicies() {
    alert('Exporting access control policies...\nGenerating configuration backup in multiple formats.');
}

function manageEmergencyAccess() {
    alert('Opening emergency access management...\nConfigure break-glass procedures and override protocols.');
}

function viewAccessLogs() {
    alert('Opening access logs dashboard...\nShowing real-time access monitoring and alerts.');
}

// Initialize Access Control functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create Role Modal trigger
    const createRoleBtn = document.getElementById('createRoleBtn');
    const createRoleModal = document.getElementById('createRoleModal');
    
    if (createRoleBtn && createRoleModal) {
        createRoleBtn.addEventListener('click', () => {
            createRoleModal.style.display = 'flex';
        });
    }

    // Add Policy Button trigger
    const addPolicyBtn = document.getElementById('addPolicyBtn');
    if (addPolicyBtn) {
        addPolicyBtn.addEventListener('click', () => {
            alert('Opening policy creation interface...\nDefine new access control rules.');
        });
    }

    // Set default effective date to today
    const effectiveDate = document.getElementById('roleEffectiveDate');
    if (effectiveDate) {
        effectiveDate.value = new Date().toISOString().split('T')[0];
    }

    // Set default expiry date to 1 year from now
    const expiryDate = document.getElementById('roleExpiryDate');
    if (expiryDate) {
        const nextYear = new Date();
        nextYear.setFullYear(nextYear.getFullYear() + 1);
        expiryDate.value = nextYear.toISOString().split('T')[0];
    }

    // Initialize permission inheritance
    const inheritanceSelect = document.getElementById('roleInheritance');
    if (inheritanceSelect) {
        inheritanceSelect.addEventListener('change', function() {
            const selectedRole = this.value;
            if (selectedRole) {
                alert(`Inheriting permissions from ${selectedRole}...\nBase permissions will be pre-selected.`);
                // In real implementation, this would load the template permissions
            }
        });
    }

    // Role code validation
    const roleCodeInput = document.getElementById('roleCode');
    if (roleCodeInput) {
        roleCodeInput.addEventListener('input', function() {
            const value = this.value;
            if (value && !value.startsWith('ROLE_')) {
                this.setCustomValidity('Role code must start with ROLE_');
            } else {
                this.setCustomValidity('');
            }
        });
    }
});

// Advanced Role Management Functions
function analyzeRoleConflicts() {
    alert('Analyzing role conflicts and permission overlaps...\nIdentifying potential security issues.');
}

function generateRoleReport() {
    alert('Generating comprehensive role analysis report...\nIncluding permission maps and user assignments.');
}

function bulkRoleAssignment() {
    alert('Opening bulk role assignment interface...\nAssign roles to multiple users simultaneously.');
}

function roleComplianceCheck() {
    alert('Running role compliance check...\nVerifying against security standards and regulations.');
}

// Policy Management Advanced Functions
function validatePolicySyntax() {
    alert('Validating policy syntax and logic...\nChecking for conflicts and errors.');
}

function policyImpactAnalysis() {
    alert('Running policy impact analysis...\nAssessing how policy changes affect users.');
}

function exportPolicyTemplate() {
    alert('Exporting policy template...\nCreating reusable policy configurations.');
}

// Security Compliance Functions
function runComplianceScan() {
    alert('Initiating security compliance scan...\nChecking against HIPAA, GDPR, and other standards.');
}

function generateComplianceReport() {
    alert('Generating compliance report...\nCreating detailed compliance documentation.');
}

function remediateComplianceIssues() {
    alert('Opening compliance remediation tool...\nAddressing identified security gaps.');
}

// Real-time Monitoring Functions
function monitorAccessPatterns() {
    alert('Opening real-time access pattern monitor...\nTracking user behavior and access trends.');
}

function alertOnPolicyViolation() {
    alert('Configuring policy violation alerts...\nSetting up real-time notifications.');
}

function accessRiskAssessment() {
    alert('Running access risk assessment...\nIdentifying potential security risks in access patterns.');
}

// Emergency Access Functions
function initiateEmergencyProtocol() {
    if (confirm('Initiate emergency access protocol? This will temporarily elevate permissions for authorized personnel.')) {
        alert('Emergency protocol initiated.\nEnhanced logging and monitoring activated.');
    }
}

function emergencyAccessReview() {
    alert('Reviewing emergency access events...\nAuditing break-glass procedure usage.');
}

// Utility Functions for Access Control
function calculatePermissionComplexity() {
    alert('Calculating permission complexity score...\nAssessing manageability of current access structure.');
}

function optimizeRoleStructure() {
    alert('Analyzing role structure for optimization...\nSuggesting improvements for better security management.');
}

function backupAccessConfiguration() {
    alert('Creating access control configuration backup...\nSaving current roles and policies.');
}

function restoreAccessConfiguration() {
    alert('Opening configuration restore interface...\nRestore from previous backup.');
}

// Export functionality for Access Control data
function exportAllAccessData() {
    alert('Exporting complete access control data...\nIncluding roles, policies, assignments, and logs.');
}

// Import functionality
function importAccessConfiguration() {
    alert('Opening import configuration interface...\nLoad access control settings from file.');
}

// Backup & Recovery JavaScript Functions

// Backup Management Functions
function viewBackupDetails(backupId) {
    alert(`Viewing backup details: ${backupId}\nShowing comprehensive backup information and logs.`);
}

function runBackupNow(backupId) {
    if (confirm(`Start backup job: ${backupId} immediately?`)) {
        alert(`Backup job ${backupId} started.\nMonitoring progress...`);
    }
}

function editBackupSchedule(backupId) {
    alert(`Editing schedule for backup: ${backupId}\nOpening schedule configuration.`);
}

function retryBackup(backupId) {
    alert(`Retrying failed backup: ${backupId}\nAttempting to complete the backup job.`);
}

function viewBackupLogs(backupId) {
    alert(`Viewing logs for backup: ${backupId}\nShowing detailed execution logs and errors.`);
}

// Quick Action Functions
function runFullBackup() {
    if (confirm('Start full system backup? This may impact system performance during the operation.')) {
        alert('Full system backup initiated.\nEstimated completion: 2-3 hours.');
    }
}

function runIncrementalBackup() {
    alert('Incremental backup started.\nBacking up changed data only. Estimated completion: 15-30 minutes.');
}

function verifyBackupIntegrity() {
    alert('Starting backup integrity verification...\nThis will validate all backup files and checksums.');
}

function runDisasterRecoveryTest() {
    if (confirm('Start disaster recovery test? This will simulate a complete system recovery.')) {
        alert('DR test initiated.\nRunning in isolated test environment.');
    }
}

// Recovery Functions
function testRecovery() {
    alert('Starting recovery test...\nThis will verify recovery procedures without affecting production.');
}

function startRecovery() {
    const recoveryPoint = document.getElementById('recoveryPointSelect').value;
    const recoveryType = document.getElementById('recoveryType').value;
    
    if (!recoveryPoint) {
        alert('Please select a recovery point.');
        return;
    }
    
    if (confirm(`Start ${recoveryType} recovery from ${recoveryPoint}? This operation cannot be undone.`)) {
        alert(`Recovery operation started.\nMonitoring progress...\nEstimated time: 30-60 minutes.`);
    }
}

// Initialize Backup & Recovery functionality
document.addEventListener('DOMContentLoaded', function() {
    // Run Backup Modal trigger
    const runBackupBtn = document.getElementById('runBackupBtn');
    const runBackupModal = document.getElementById('runBackupModal');
    
    if (runBackupBtn && runBackupModal) {
        runBackupBtn.addEventListener('click', () => {
            runBackupModal.style.display = 'flex';
        });
    }

    // Configure Backup Schedule trigger
    const configureBackupBtn = document.getElementById('configureBackupBtn');
    if (configureBackupBtn) {
        configureBackupBtn.addEventListener('click', () => {
            alert('Opening backup schedule configuration...\nConfigure automated backup jobs and retention policies.');
        });
    }

    // Start Recovery Wizard trigger
    const startRecoveryBtn = document.getElementById('startRecoveryBtn');
    if (startRecoveryBtn) {
        startRecoveryBtn.addEventListener('click', () => {
            alert('Launching recovery wizard...\nGuided recovery process for different scenarios.');
        });
    }

    // Tab functionality for backup history
    const tabs = document.querySelectorAll('#backup-recovery .tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            const tabContainer = this.closest('.card-body');
            
            // Remove active class from all tabs
            tabContainer.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');

            // Hide all tab contents
            tabContainer.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // Show selected tab content
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Backup job selection handler
    const backupJobSelect = document.getElementById('backupJobSelect');
    if (backupJobSelect) {
        backupJobSelect.addEventListener('change', function() {
            updateBackupEstimate(this.value);
        });
    }
});

// Update backup estimate based on selected job
function updateBackupEstimate(backupJob) {
    const estimates = {
        'patient_db': { duration: '45-60 min', size: '185 GB', impact: 'Medium' },
        'medical_records': { duration: '8-12 min', size: '45 GB', impact: 'Low' },
        'pharmacy_inv': { duration: '5-8 min', size: '12 GB', impact: 'Low' },
        'billing_system': { duration: '10-15 min', size: '8 GB', impact: 'Low' },
        'system_config': { duration: '2-3 min', size: '2 GB', impact: 'Low' },
        'all_critical': { duration: '2-3 hours', size: '250 GB', impact: 'High' }
    };

    const estimate = estimates[backupJob];
    const estimateElement = document.querySelector('.backup-estimate');
    
    if (estimate && estimateElement) {
        estimateElement.innerHTML = `
            <strong>Estimated:</strong>
            <span>Duration: ${estimate.duration}</span>
            <span>Size: ${estimate.size}</span>
            <span>Impact: ${estimate.impact}</span>
        `;
    }
}

// Advanced Backup Management Functions
function exportBackupConfiguration() {
    alert('Exporting backup configuration...\nGenerating configuration file for disaster recovery.');
}

function importBackupConfiguration() {
    alert('Opening backup configuration import...\nRestore backup settings from file.');
}

function optimizeBackupStorage() {
    alert('Starting storage optimization...\nAnalyzing and compressing backup data.');
}

function purgeOldBackups() {
    if (confirm('Purge backups older than retention policy? This action cannot be undone.')) {
        alert('Purging old backups...\nFollowing retention policy rules.');
    }
}

// Disaster Recovery Functions
function generateDRReport() {
    alert('Generating disaster recovery report...\nCreating comprehensive DR readiness assessment.');
}

function updateDRPlan() {
    alert('Opening DR plan update interface...\nModify disaster recovery procedures and contacts.');
}

function testDRCommunication() {
    alert('Testing DR communication channels...\nVerifying emergency contact procedures.');
}

// Monitoring and Alerting Functions
function configureBackupAlerts() {
    alert('Configuring backup alerts...\nSet up notifications for backup failures and warnings.');
}

function viewBackupMetrics() {
    alert('Opening backup metrics dashboard...\nShowing performance and success rate analytics.');
}

function analyzeBackupTrends() {
    alert('Analyzing backup trends...\nIdentifying patterns and potential issues.');
}

// Storage Management Functions
function expandStorage() {
    alert('Opening storage expansion options...\nAdd additional storage capacity for backups.');
}

function migrateBackupData() {
    alert('Starting backup data migration...\nMoving backups to different storage tier.');
}

function analyzeStorageCosts() {
    alert('Analyzing storage costs...\nCalculating backup storage expenses and optimization opportunities.');
}

// Compliance and Reporting Functions
function generateComplianceReport() {
    alert('Generating compliance report...\nCreating HIPAA and regulatory compliance documentation.');
}

function runComplianceCheck() {
    alert('Running compliance check...\nVerifying backup procedures against regulatory requirements.');
}

function exportAuditTrail() {
    alert('Exporting backup audit trail...\nGenerating comprehensive activity logs for auditors.');
}

// Emergency Functions
function emergencyBackupStop() {
    if (confirm('EMERGENCY: Stop all backup operations? This may leave systems unprotected.')) {
        alert('All backup operations stopped.\nManual intervention required to resume.');
    }
}

function emergencyRecoveryMode() {
    if (confirm('Activate emergency recovery mode? This will prioritize recovery over all other operations.')) {
        alert('Emergency recovery mode activated.\nAll resources dedicated to recovery operations.');
    }
}

// Utility Functions
function calculateRTO() {
    alert('Calculating Recovery Time Objective...\nAssessing current RTO compliance.');
}

function calculateRPO() {
    alert('Calculating Recovery Point Objective...\nEvaluating data loss protection levels.');
}

function backupHealthCheck() {
    alert('Running backup health check...\nComprehensive system health assessment.');
}

// JavaScript functions for enhanced functionality
function viewAuditDetails(auditId) {
    // Implementation for viewing audit details
    console.log('Viewing details for audit: ' + auditId);
    // This would typically open a modal or navigate to a details page
}

function searchAuditLogs() {
    // Implementation for searching audit logs
    console.log('Searching audit logs...');
    // This would typically make an API call and update the table
}

function clearAuditFilters() {
    // Implementation for clearing all filters
    document.getElementById('auditLogSearch').value = '';
    document.getElementById('eventTypeFilter').value = '';
    document.getElementById('severityFilter').value = '';
    document.getElementById('auditStartDate').value = '';
    document.getElementById('auditEndDate').value = '';
    document.getElementById('userFilter').value = '';
    document.getElementById('resourceFilter').value = '';
    document.getElementById('ipFilter').value = '';
    
    console.log('All filters cleared');
}

// Additional functionality for new features
document.getElementById('selectAllLogs').addEventListener('change', function(e) {
    const checkboxes = document.querySelectorAll('.log-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = e.target.checked;
    });
});

// Export logs functionality
document.getElementById('exportLogsBtn').addEventListener('click', function() {
    // Implementation for exporting logs
    console.log('Exporting logs...');
    // This would typically open an export dialog or trigger a download
});

// Advanced search functionality
document.getElementById('advancedSearchBtn').addEventListener('click', function() {
    // Implementation for advanced search
    console.log('Opening advanced search...');
    // This would typically expand the search section or open a modal
});

function selectTheme(theme) {
    // Remove active class from all buttons
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Apply the theme (this would typically update CSS variables)
    applyTheme(theme);
    
    console.log('Theme changed to:', theme);
}

function applyTheme(theme) {
    const root = document.documentElement;
    
    if (theme === 'dark') {
        root.style.setProperty('--bg-primary', '#1a1a1a');
        root.style.setProperty('--bg-secondary', '#2d2d2d');
        root.style.setProperty('--text-primary', '#ffffff');
        root.style.setProperty('--text-secondary', '#b0b0b0');
    } else if (theme === 'light') {
        root.style.setProperty('--bg-primary', '#ffffff');
        root.style.setProperty('--bg-secondary', '#f8f9fa');
        root.style.setProperty('--text-primary', '#2d3748');
        root.style.setProperty('--text-secondary', '#718096');
    } else {
        // Auto theme - follow system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            applyTheme('dark');
        } else {
            applyTheme('light');
        }
    }
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    selectTheme(savedTheme);
});

