<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Knight Bot - WhatsApp Linker</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"/>
  <style>
    :root {
      --primary-color: #000000;
      --secondary-color: #ffffff;
      --accent-color: #f0f0f0;
      --text-color: #000000;
      --background-color: #ffffff;
      --hover-color: #f5f5f5;
      --border-color: rgba(0, 0, 0, 0.1);
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', sans-serif;
      background: var(--background-color);
      color: var(--text-color);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 15px;
    }

    .container {
      width: 100%;
      max-width: 450px;
      background: var(--background-color);
      border-radius: 16px;
      padding: 25px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
      border: 1px solid var(--border-color);
    }

    .header {
      text-align: center;
      margin-bottom: 25px;
    }

    .logo {
      width: 70px;
      height: 70px;
      margin: 0 auto 16px;
      background: var(--primary-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      color: white;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    }

    .title {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 8px;
      color: var(--primary-color);
    }

    .subtitle {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.7);
      margin-bottom: 20px;
    }

    .social-icons {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-bottom: 20px;
    }

    .social-icons a {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 18px;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .social-icons a.youtube { background: #FF0000; }
    .social-icons a.telegram { background: #0088cc; }
    .social-icons a.whatsapp { background: #0cfa10; }
    .social-icons a.github { background: #333; }

    .social-icons a:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }

    /* Toggle Switch Styles */
    .toggle-container {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      background: var(--hover-color);
      border-radius: 12px;
      padding: 4px;
      border: 1px solid var(--border-color);
    }

    .toggle-option {
      flex: 1;
      padding: 10px 16px;
      text-align: center;
      cursor: pointer;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.3s ease;
      position: relative;
    }

    .toggle-option.active {
      background: var(--primary-color);
      color: var(--secondary-color);
    }

    .toggle-option:not(.active) {
      color: var(--text-color);
    }

    .toggle-option:hover:not(.active) {
      background: var(--background-color);
    }
    .copy-btn {
      width: 100%;
      padding: 12px;
      background: var(--hover-color);
      border: 1.5px solid var(--border-color);
      border-radius: 12px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .copy-btn:hover {
      background: var(--background-color);
      border-color: var(--primary-color);
    }

    .input-group {
      margin-bottom: 20px;
      transition: all 0.3s ease;
    }

    .input-group.hidden {
      display: none;
    }

    .input-label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      font-size: 13px;
    }

    .input-field {
      width: 100%;
      padding: 12px;
      border: 1.5px solid var(--border-color);
      border-radius: 12px;
      background: var(--background-color);
      color: var(--text-color);
      font-size: 15px;
    }

    .input-field:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    }

    .generate-btn {
      width: 100%;
      padding: 12px;
      background: var(--primary-color);
      border: none;
      border-radius: 12px;
      color: var(--secondary-color);
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-bottom: 16px;
    }

    .generate-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .generate-btn.hidden {
      display: none;
    }

    .code-display {
      background: var(--hover-color);
      padding: 12px;
      border-radius: 12px;
      text-align: center;
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 16px;
      min-height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1.5px solid var(--border-color);
    }

    .qr-display {
      background: var(--hover-color);
      padding: 30px;
      border-radius: 12px;
      text-align: center;
      margin-bottom: 16px;
      border: 1.5px solid var(--border-color);
      display: none;
    }

    .qr-image {
      max-width: 280px;
      max-height: 280px;
      margin: 0 auto 20px;
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }

    .qr-instructions {
      font-size: 13px;
      color: rgba(0, 0, 0, 0.7);
      line-height: 1.5;
    }

    .success-message {
      color: #000aff;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 16px;
    }

    .error-message {
      color: #e74c3c;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 14px;
    }

    .loading {
      display: none;
      text-align: center;
      margin: 16px 0;
    }

    .loading i {
      font-size: 24px;
      color: var(--primary-color);
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .footer {
      text-align: center;
      margin-top: 20px;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.5);
    }

    @media (max-width: 480px) {
      .container {
        padding: 20px;
        border-radius: 12px;
        max-width: 400px;
      }

      .code-display {
        font-size: 16px;
        min-height: 50px;
      }

      .qr-image {
        max-width: 240px;
        max-height: 240px;
      }

      .qr-display {
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo"><i class="fas fa-robot"></i></div>
      <h1 class="title">Knight Bot</h1>
      <p class="subtitle">Link your WhatsApp device</p>
      <div class="social-icons">
        <a href="https://www.youtube.com/@mr_unique_hacker?sub_confirmation=1" target="_blank" class="youtube"><i class="fab fa-youtube"></i></a>
        <a href="https://t.me/+hxojkc7kaVViYzdl" target="_blank" class="telegram"><i class="fab fa-telegram-plane"></i></a>
        <a href="https://whatsapp.com/channel/0029Va90zAnIHphOuO8Msp3A" target="_blank" class="whatsapp"><i class="fab fa-whatsapp"></i></a>
        <a href="https://github.com/mruniquehacker/Knightbot-md" target="_blank" class="github"><i class="fab fa-github"></i></a>
      </div>
    </div>

    <!-- Toggle Switch -->
    <div class="toggle-container">
      <div class="toggle-option active" data-mode="pair">
        <i class="fas fa-key"></i> Pair Code
      </div>
      <div class="toggle-option" data-mode="qr">
        <i class="fas fa-qrcode"></i> QR Code
      </div>
    </div>

    <div class="input-group" id="inputGroup">
      <label class="input-label">Enter your WhatsApp number with country code</label>
      <input type="text" id="mobileNumber" class="input-field" placeholder="+917023951514" pattern="[+][0-9]{10,}" title="Please enter country code starting with + followed by number">
    </div>

    <button class="generate-btn" id="submit">
      <i class="fas fa-key"></i> Generate Pair Code
    </button>

    <div class="loading" id="loading">
      <i class="fas fa-spinner"></i>
    </div>

    <div class="code-display" id="codeDisplay">
      Your pair code will appear here
    </div>

    <div class="qr-display" id="qrDisplay">
      <img id="qrImage" class="qr-image" src="" alt="QR Code">
      <div class="qr-instructions" id="qrInstructions">
        Scan this QR code with your WhatsApp app
      </div>
    </div>

    <button class="copy-btn" id="copy" onclick="copyCode()">
      <i class="fas fa-copy"></i> Copy Code
    </button>

    <div class="footer">
      <p>© 2025 Mr Unique Hacker | Knight Bot</p>
    </div>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.0.0-alpha.1/axios.min.js"></script>
  <script>
    let currentMode = 'pair';

    // Toggle functionality
    document.querySelectorAll('.toggle-option').forEach(option => {
      option.addEventListener('click', function() {
        const mode = this.dataset.mode;
        if (mode === currentMode) return;

        // Update active state
        document.querySelectorAll('.toggle-option').forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');

        // Update mode
        currentMode = mode;

        // Update button and input visibility
        const submitBtn = document.getElementById('submit');
        const inputGroup = document.getElementById('inputGroup');
        
        if (mode === 'pair') {
          submitBtn.innerHTML = '<i class="fas fa-key"></i> Generate Pair Code';
          submitBtn.classList.remove('hidden');
          inputGroup.classList.remove('hidden');
        } else {
          submitBtn.classList.add('hidden');
          inputGroup.classList.add('hidden');
          // Auto-generate QR code when QR mode is selected
          generateQRCode();
        }

        // Clear displays
        document.getElementById('codeDisplay').innerHTML = 'Your pair code will appear here';
        document.getElementById('qrDisplay').style.display = 'none';
        document.getElementById('codeDisplay').style.display = 'flex';
      });
    });

    async function generateQRCode() {
      const codeDisplay = document.getElementById("codeDisplay");
      const qrDisplay = document.getElementById("qrDisplay");
      const loadingSpinner = document.getElementById("loading");

      loadingSpinner.style.display = "block";
      codeDisplay.innerHTML = '';
      qrDisplay.style.display = 'none';

      try {
        const response = await axios('/qr');
        
        if (response.data.qr) {
          document.getElementById('qrImage').src = response.data.qr;
          document.getElementById('qrInstructions').innerHTML = response.data.instructions.join('<br>');
          qrDisplay.style.display = 'block';
          codeDisplay.style.display = 'none';
        } else {
          codeDisplay.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-circle"></i> Failed to generate QR code</div>';
          codeDisplay.style.display = 'flex';
        }
      } catch (error) {
        console.error("Error generating QR code:", error);
        codeDisplay.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-circle"></i> Error generating QR code. Please try again.</div>';
        codeDisplay.style.display = 'flex';
      } finally {
        loadingSpinner.style.display = "none";
      }
    }

    document.getElementById("submit").addEventListener("click", async (e) => {
      e.preventDefault();
      
      const mobileNumberInput = document.getElementById("mobileNumber");
      const codeDisplay = document.getElementById("codeDisplay");
      const qrDisplay = document.getElementById("qrDisplay");
      const loadingSpinner = document.getElementById("loading");

      const mobileNumber = mobileNumberInput.value.trim();
      if (!mobileNumber) {
        codeDisplay.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-circle"></i> Please enter your WhatsApp number</div>';
        return;
      }

      loadingSpinner.style.display = "block";
      codeDisplay.innerHTML = '';
      qrDisplay.style.display = 'none';

      try {
        const response = await axios(`/pair?number=${mobileNumber.replace(/[^0-9]/g, "")}`);
        
        const code = response.data.code || "Service Unavailable";
        if (code === "Service Unavailable") {
          codeDisplay.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-circle"></i> Service Unavailable</div>';
        } else {
          codeDisplay.innerHTML = `<div class="success-message"><i class="fas fa-check-circle"></i> CODE: ${code}</div>`;
        }
        codeDisplay.style.display = 'flex';
      } catch (error) {
        console.error("Error generating code:", error);
        codeDisplay.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-circle"></i> Error generating code. Please try again.</div>';
        codeDisplay.style.display = 'flex';
      } finally {
        loadingSpinner.style.display = "none";
      }
    });
    function copyCode() {
      const codeDisplay = document.getElementById("codeDisplay").innerText;
      const code = codeDisplay.replace('CODE: ', '');
      navigator.clipboard.writeText(code).then(() => {
        const copyBtn = document.getElementById("copy");
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
          copyBtn.innerHTML = originalText;
        }, 2000);
      }).catch(err => {
        console.error("Failed to copy text: ", err);
      });
    }
  </script>
</body>
</html>
