document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------
    // 1. Navigation and Page Handling (Single-Page App)
    // ----------------------------------------------------
    const navLinks = document.querySelectorAll('nav ul a');
    const sections = document.querySelectorAll('main section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);

            // Hide all sections
            sections.forEach(section => section.classList.remove('active'));

            // Show the target section
            document.getElementById(targetId).classList.add('active');

            // Update active link in navigation
            navLinks.forEach(item => item.classList.remove('active'));
            e.target.classList.add('active');
        });
    });

    // ----------------------------------------------------
    // 2. Generation Hierarchy Logic
    // ----------------------------------------------------
    const hierarchyContainer = document.getElementById('hierarchy-container');
    const updateBtn = document.getElementById('update-data-btn');

    // Dummy data for generations (you can expand this)
    const familyData = {
        1: { name: 'Dadasaheb', dob: 'Estd. 1890', details: 'The founder of the lineage. A great visionary and community leader.' },
        2: { name: 'Balaram', dob: 'Estd. 1925', details: 'Son of Dadasaheb, continued his father\'s work.' },
        3: { name: 'Manoj', dob: 'Estd. 1950', details: 'A respected teacher and scholar in the community.' },
        4: { name: 'Ritesh', dob: 'Estd. 1978', details: 'An innovator and entrepreneur.' },
        5: { name: 'Sunita', dob: 'Estd. 2005', details: 'The youngest generation, full of promise.' },
        // Add more generations as needed up to 8
    };

    // Function to save data to local storage
    const saveData = () => {
        localStorage.setItem('nayagarhFamilyData', JSON.stringify(familyData));
    };

    // Function to load data from local storage or use default
    const loadData = () => {
        const storedData = localStorage.getItem('nayagarhFamilyData');
        if (storedData) {
            Object.assign(familyData, JSON.parse(storedData));
        }
    };

    // Function to render the hierarchy
    const renderHierarchy = () => {
        // Clear existing hierarchy
        hierarchyContainer.innerHTML = '';
        
        let activeGen = 1;
        
        // Find the deepest generation with an 'active' class from local storage, if any
        if (localStorage.getItem('activeGeneration')) {
            activeGen = parseInt(localStorage.getItem('activeGeneration'));
        }

        // Render generations up to the active one
        for (let i = 1; i <= Object.keys(familyData).length; i++) {
            const genData = familyData[i];
            const generationBox = document.createElement('div');
            generationBox.className = 'generation-box';
            generationBox.dataset.gen = i;

            if (i > activeGen) {
                generationBox.style.display = 'none';
            }

            generationBox.innerHTML = `
                <span class="gen-title">${i}st Generation</span>
                <div class="details-popup">
                    <h3>Name: ${genData.name}</h3>
                    <p>DOB: ${genData.dob}</p>
                    <p>Details: ${genData.details}</p>
                </div>
            `;

            hierarchyContainer.appendChild(generationBox);
        }
    };

    // Function to handle click on a generation box
    hierarchyContainer.addEventListener('click', (e) => {
        const genBox = e.target.closest('.generation-box');
        if (genBox) {
            const currentGen = parseInt(genBox.dataset.gen);
            const nextGen = currentGen + 1;
            const nextGenBox = document.querySelector(generation-box[data-gen - "${nextGen}"]);

            if (nextGenBox) {
                nextGenBox.style.display = 'block';
                localStorage.setItem('activeGeneration', nextGen);
            }
        }
    });

    // Handle "Update Data" button click
    updateBtn.addEventListener('click', () => {
        const newGenName = prompt("Enter a new name for the 1st generation:");
        if (newGenName) {
            // Update dummy data and save to local storage
            familyData[1].name = newGenName;
            saveData();
            // Re-render to show the updated data
            renderHierarchy();
            alert("Data updated successfully!");
        }
    });

    // Initialize the page
    loadData();
    renderHierarchy();

    // ----------------------------------------------------
    // 3. Misc. Page Functionality
    // ----------------------------------------------------
    // Update current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Contact form submission (optional, for demonstration)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Form submitted successfully! (This is a dummy action)');
            contactForm.reset();
    });
}

});