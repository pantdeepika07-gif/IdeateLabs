// Functionality for index.html (Login/Signup Page)
function showSignup() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
}

function showLogin() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
}

function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (email && password) {
        alert("Login successful! Redirecting to the dashboard...");
        window.location.href = 'dashboard.html';
    } else {
        alert("Please enter both email and password.");
    }
}

function signup() {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    if (name && email && password) {
        alert("Account created successfully! Redirecting to login...");
        window.location.href = 'dashboard.html';
    } else {
        alert("Please fill out all the fields.");
    }
}

// Dummy data for idea generation (for idea.html)
const ideas = {
    'Health Tech': [
        "A personalized nutrition app that uses AI to analyze your diet and suggest meals based on health goals.",
        "A mental health platform that provides instant support and connects users to certified therapists.",
        "A wearable device that tracks vital signs and alerts a pre-selected contact in case of an emergency."
    ],
    'FinTech': [
        "A gamified savings app that makes investing and saving money fun and easy for young adults.",
        "A decentralized finance (DeFi) platform for micro-loans in developing countries.",
        "An AI-powered expense tracker that categorizes spending and suggests budget optimizations."
    ],
    'Education': [
        "An interactive learning platform that uses augmented reality to teach complex science concepts.",
        "A peer-to-peer tutoring marketplace that connects students with tutors based on their learning style.",
        "An AI chatbot that helps students with their homework and provides instant explanations."
    ],
    'Sustainability': [
        "A mobile app that helps users track their carbon footprint and find eco-friendly alternatives.",
        "A platform that connects individuals and companies to local recycling and upcycling initiatives.",
        "A marketplace for refurbished electronics and second-hand goods, promoting circular economy."
    ],
    'Gaming': [
        "A multiplayer mobile game where players solve real-world environmental problems to earn rewards.",
        "A platform that uses AI to generate unique game levels and stories on the fly.",
        "A social platform for indie game developers to collaborate and find team members."
    ],
    'E-commerce': [
        "An AI-powered personal shopping assistant that recommends products based on user style and past purchases.",
        "A dropshipping platform that focuses exclusively on sustainable and ethically sourced products.",
        "A social e-commerce app where users can create and share shopping lists with friends."
    ],
    'Social Media': [
        "A professional networking app that uses skill-based matching to connect people with similar expertise.",
        "A short-form video platform dedicated to educational content and life hacks.",
        "A social media app that allows users to create and join interest-based communities without advertisements."
    ],
    'Artificial Intelligence': [
        "A tool that uses AI to summarize lengthy research papers into a few key points.",
        "An AI-powered code assistant that helps developers find bugs and suggest optimizations.",
        "A chatbot for customer support that understands and responds to complex user queries."
    ],
    'Blockchain': [
        "A decentralized voting system to ensure transparency and prevent fraud in elections.",
        "A supply chain management platform that uses blockchain to track products from source to consumer.",
        "A non-fungible token (NFT) marketplace for digital art and collectibles."
    ]
};

function generateIdea() {
    const theme = document.getElementById('theme-select').value;
    const ideaOutput = document.getElementById('idea-output');

    if (theme && ideas[theme]) {
        const selectedIdeas = ideas[theme];
        const randomIdea = selectedIdeas[Math.floor(Math.random() * selectedIdeas.length)];
        ideaOutput.innerHTML = `<h3>Generated Idea:</h3><p>${randomIdea}</p>`;
    } else {
        ideaOutput.innerHTML = `<p style="color: red;">Please select a theme.</p>`;
    }
}

function generateProblemStatement() {
    const problemInput = document.getElementById('problem-input').value;
    const problemOutput = document.getElementById('problem-output');

    if (problemInput) {
        problemOutput.innerHTML = `<h3>Problem Statement:</h3><p>There is a need for a solution that addresses "${problemInput.slice(0, 50)}..." to improve efficiency and user experience in this domain.</p>`;
    } else {
        problemOutput.innerHTML = `<p style="color: red;">Please describe your idea first.</p>`;
    }
}

// Dummy data for team finder (for find_team.html)
const teamMembers = [
    { name: "Ananya Sharma", role: "Developer", skills: ["Frontend Development", "React", "JavaScript", "UI/UX Design"], experience: "Senior", status: "Looking for a team" },
    { name: "Rahul Singh", role: "Developer", skills: ["Backend Development", "Python", "Node.js", "APIs"], experience: "Mid-Level", status: "Open to new projects" },
    { name: "Priya Patel", role: "Designer", skills: ["UI/UX Design", "Figma", "Adobe XD", "Prototyping"], experience: "Senior", status: "Looking for a team" },
    { name: "Vikram Kumar", role: "Developer", skills: ["Machine Learning", "Python", "TensorFlow", "Data Science"], experience: "Mid-Level", status: "Available" },
    { name: "Neha Gupta", role: "Developer", skills: ["Frontend Development", "Vue.js", "CSS", "Responsive Design"], experience: "Junior", status: "Looking for a team" },
];

function searchMembers() {
    const skill = document.getElementById('skill-select').value;
    const role = document.getElementById('role-select').value;
    const teamListContainer = document.getElementById('team-list');
    
    const filteredMembers = teamMembers.filter(member => {
        const matchesSkill = skill ? member.skills.includes(skill) : true;
        const matchesRole = role ? member.role === role : true;
        return matchesSkill && matchesRole;
    });

    teamListContainer.innerHTML = '';

    if (filteredMembers.length > 0) {
        filteredMembers.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.className = 'team-member-card';
            memberCard.innerHTML = `
                <div class="member-details">
                    <h3>${member.name} (${member.role})</h3>
                    <p><strong>Experience:</strong> ${member.experience}</p>
                    <p class="skills"><strong>Skills:</strong> ${member.skills.map(s => `<span>${s}</span>`).join('')}</p>
                    <p><strong>Status:</strong> ${member.status}</p>
                </div>
                <button class="contact-button">Contact</button>
            `;
            teamListContainer.appendChild(memberCard);
        });
    } else {
        teamListContainer.innerHTML = `<p style="text-align: center;">No members found matching your criteria. Try a different search.</p>`;
    }
}

// Functionality for chat.html using Socket.io (with AI bot)
if (document.getElementById('message-form')) {
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');
    const chatWindow = document.getElementById('chat-window');

    const socket = io();

    // Updated bot responses with HackMate persona
    const botResponses = {
        "hello": "Greetings, traveler! What adventure shall we embark on today?",
        "hackathon": "A hackathon is a grand quest! Stay focused on your mission and work together as a party!",
        "idea": "In the realm of ideas, the possibilities are endless! Perhaps a quick visit to the Idea Generator can summon a new one for you!",
        "help": "My knowledge is at your service! What do you need guidance on?",
        "thank you": "You're most welcome! May your path be clear and your code be bug-free!",
        "hackmate": "That is my name! I am here to help guide you on your epic quest."
    };

    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userMessage = messageInput.value.trim();

        if (userMessage) {
            // Display the user's message on their own screen immediately
            appendMessage(userMessage, 'user-message');

            // Send the message to the server for other users
            socket.emit('chat message', userMessage);

            // Check for bot keywords and respond
            const lowerCaseMessage = userMessage.toLowerCase();
            let botResponse = "My apologies, I did not understand your request. Perhaps you should try asking about 'hackathon' or 'idea'.";
            
            for (const keyword in botResponses) {
                if (lowerCaseMessage.includes(keyword)) {
                    botResponse = botResponses[keyword];
                    break;
                }
            }

            // Simulate bot typing delay and then display response
            setTimeout(() => {
                appendMessage(botResponse, 'bot-message');
            }, 1000);
            
            messageInput.value = '';
        }
    });

    socket.on('chat message', (msg) => {
        appendMessage(msg, 'other-message');
    });

    function appendMessage(text, type) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', type);
        messageElement.textContent = text;
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
}

// Functionality for team.html (My Team Page)
if (document.getElementById('add-member-form')) {
    const addMemberForm = document.getElementById('add-member-form');
    const teamListContainer = document.getElementById('team-list-container');

    let currentTeamMembers = JSON.parse(localStorage.getItem('teamMembers')) || [];
    renderTeamMembers();

    addMemberForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const memberName = document.getElementById('member-name').value;
        const memberSkills = document.getElementById('member-skills').value.split(',').map(s => s.trim());
        const memberLevel = document.getElementById('member-level').value;
        const memberTime = document.getElementById('member-time').value;

        const newMember = {
            name: memberName,
            skills: memberSkills,
            level: memberLevel,
            time: memberTime
        };

        currentTeamMembers.push(newMember);
        saveTeamMembers();
        renderTeamMembers();
        addMemberForm.reset();
    });

    function renderTeamMembers() {
        teamListContainer.innerHTML = '';
        if (currentTeamMembers.length === 0) {
            teamListContainer.innerHTML = '<p style="text-align: center;">Your team members will appear here.</p>';
            return;
        }

        currentTeamMembers.forEach((member, index) => {
            const memberCard = document.createElement('div');
            memberCard.className = 'member-card';
            memberCard.innerHTML = `
                <div class="member-info">
                    <h3>${member.name}</h3>
                    <p class="skills"><strong>Skills:</strong> ${member.skills.map(s => `<span>${s}</span>`).join('')}</p>
                    <p><strong>Skill Level:</strong> ${member.level}</p>
                    <p><strong>Time Allotted:</strong> ${member.time} hours</p>
                </div>
                <button class="remove-button" data-index="${index}">Remove</button>
            `;
            teamListContainer.appendChild(memberCard);
        });

        document.querySelectorAll('.remove-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                removeMember(index);
            });
        });
    }

    function removeMember(index) {
        currentTeamMembers.splice(index, 1);
        saveTeamMembers();
        renderTeamMembers();
    }

    function saveTeamMembers() {
        localStorage.setItem('teamMembers', JSON.stringify(currentTeamMembers));
    }
}

// AI Work Distribution Functionality
function distributeWork() {
    const teamMembers = JSON.parse(localStorage.getItem('teamMembers')) || [];
    if (teamMembers.length === 0) {
        alert("Please add team members first!");
        return;
    }

    const tasks = [
        "Create the login page UI and integrate with the form.",
        "Design the website's overall user interface (UI) and user experience (UX).",
        "Develop the backend API for idea generation.",
        "Set up the database for user accounts and team details.",
        "Implement the real-time chat functionality.",
        "Write content for the website's landing pages.",
        "Test the entire website for bugs and performance issues.",
        "Manage the project timeline and team communication."
    ];

    const memberTasks = teamMembers.map(member => ({
        name: member.name,
        assignedTasks: []
    }));

    tasks.forEach(task => {
        let bestMember = null;
        let highestSkillMatch = -1;

        teamMembers.forEach((member, index) => {
            const skillMatch = countSkillMatches(member.skills, task);
            if (skillMatch > highestSkillMatch) {
                bestMember = memberTasks[index];
                highestSkillMatch = skillMatch;
            }
        });

        if (bestMember) {
            bestMember.assignedTasks.push(task);
        }
    });

    let distributionText = "Work has been distributed based on skills and availability:\n\n";
    memberTasks.forEach(member => {
        distributionText += `${member.name}:\n`;
        if (member.assignedTasks.length > 0) {
            member.assignedTasks.forEach((task, i) => {
                distributionText += `  - ${task}\n`;
            });
        } else {
            distributionText += "  - No tasks assigned (no skill match).\n";
        }
        distributionText += "\n";
    });

    alert(distributionText);
}

function countSkillMatches(skills, task) {
    let count = 0;
    const lowerTask = task.toLowerCase();
    
    skills.forEach(skill => {
        const lowerSkill = skill.toLowerCase();
        if (lowerTask.includes(lowerSkill) || lowerSkill.includes('ui/ux') && (lowerTask.includes('ui') || lowerTask.includes('ux'))) {
            count++;
        }
    });
    return count;
}
