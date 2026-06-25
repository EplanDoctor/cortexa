// Initialize Lucide Icons
document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    animateSupplyBurn();
    initLanguageSelector();
    initWeb3Dashboard();
});

// ==========================================================================
// 1. Language Translation System (TR/EN)
// ==========================================================================

let currentLang = 'en';

const translations = {
    en: {
        'nav-about': 'About',
        'nav-tokenomics': 'Tokenomics',
        'nav-roadmap': 'Roadmap',
        'nav-security': 'Security',
        'wallet-connect': 'Connect Wallet',
        'hero-badge': 'Next-Gen AI & DeFi Token',
        'hero-title': 'The Intelligent <br><span class="gradient-text">Neural Layer</span> <br>of Decentralized Finance',
        'hero-desc': 'Cortexa (CTX) combines advanced AI optimization with a highly secure, deflationary token model. Experience ultra-fast transactions, smart staking yields, and community governance.',
        'hero-explore': 'Explore Tokenomics',
        'hero-whitepaper': 'Whitepaper',
        'stat-supply': 'Total Supply',
        'stat-circ': 'Initial Circulating',
        'stat-burn': 'Burn Fee',
        'dash-title': 'Interactive Dashboard',
        'dash-subtitle': 'Claim your welcome tokens and purchase CTX directly with BNB to receive a 10% bonus.',
        'airdrop-title': 'Welcome Airdrop',
        'airdrop-desc': 'Connect your Web3 wallet to claim your 100 CTX welcome gift automatically. Available once per wallet.',
        'airdrop-status-label': 'Status:',
        'airdrop-status-disconnected': 'Wallet Disconnected',
        'airdrop-status-ready': 'Ready to Claim',
        'airdrop-status-claimed': 'Claimed',
        'claim-btn': 'Claim 100 CTX',
        'buy-title': 'Buy CTX Token',
        'buy-desc': 'Purchase CTX with BNB. You will automatically receive a 10% bonus on top of your purchased amount!',
        'bnb-label': 'BNB Amount',
        'ctx-label': 'CTX Received (+10% Bonus)',
        'buy-btn-wallet': 'Connect Wallet to Buy',
        'buy-btn-ready': 'Buy CTX',
        'tokenomics-title': 'Tokenomics & Allocation',
        'tokenomics-subtitle': 'A balanced, secure, and sustainable token distribution model designed for long-term growth.',
        'tokenomics-breakdown': 'Distribution Breakdown',
        'alloc-lp': 'Liquidity Pool (Locked)',
        'alloc-staking': 'Staking & Rewards',
        'alloc-marketing': 'Marketing & Growth',
        'alloc-dev': 'Core Development',
        'alloc-airdrop': 'Community & Airdrops',
        'burn-title': 'Deflationary Burn Mechanics',
        'burn-desc': 'Every transaction triggers a 1.0% burn fee, permanently reducing the total supply of CTX and increasing scarcity over time.',
        'locked-title': 'Locked Liquidity',
        'locked-desc': 'To ensure ecosystem trust, 100% of the initial liquidity pool tokens will be locked via smart contract for a minimum duration of 1 year.',
        'staking-title': 'Staking Yields',
        'staking-desc': 'Holders can stake their CTX tokens to receive up to 12.5% APY, secured directly by smart contracts with no centralized custody.',
        'roadmap-title': 'Development Roadmap',
        'roadmap-subtitle': 'Our journey to establish Cortexa as the premier AI-driven blockchain standard.',
        'phase1-title': 'Phase 1: Inception & Audits',
        'phase1-desc': 'Smart contract development (completed), thorough security audit by top-tier firms, local node testing, and website launch.',
        'phase2-title': 'Phase 2: Launch & Liquidity',
        'phase2-desc': 'Initial DEX Offering (IDO), list on PancakeSwap/Uniswap, lock initial liquidity, and release official staking platform.',
        'phase3-title': 'Phase 3: AI Integration',
        'phase3-desc': 'Deploy AI-optimized yield farming assistant on testnet, release the governance portal, and begin CoinMarketCap & CoinGecko fast-track listing.',
        'phase4-title': 'Phase 4: Global Ecosystem',
        'phase4-desc': 'CEX listings, cross-chain bridge implementation to other EVM networks, and expansion of utility partners.',
        'security-title': 'Verified & Secure',
        'security-subtitle': 'We prioritize security, transparency, and safety above all else.',
        'sec1-title': 'Audited Contract',
        'sec1-desc': 'Developed using industry-standard OpenZeppelin contracts to eliminate potential exploit vectors and vulnerabilities.',
        'sec2-title': 'Fully Transparent',
        'sec2-desc': 'Our source code is open, verified, and will be visible on BSCScan / Etherscan immediately post-deployment.',
        'sec3-title': 'Renounced Ownership',
        'sec3-desc': 'Post-deployment, ownership controls will be transferred to a decentralized governance multi-sig to prevent single points of failure.',
        'modal-title': 'Connect to Web3',
        'modal-desc': 'Select your favorite Web3 wallet provider to interact with the Cortexa platform.',
        'footer-desc': 'The next-generation AI-optimized blockchain ecosystem built for users.',
        'footer-eco': 'Ecosystem',
        'footer-comm': 'Community',
        'footer-devs': 'Developers',
        'footer-copy': '&copy; 2026 Cortexa Protocol. All rights reserved. Built using EVM Smart Contracts.'
    },
    tr: {
        'nav-about': 'Hakkında',
        'nav-tokenomics': 'Tokenomics',
        'nav-roadmap': 'Yol Haritası',
        'nav-security': 'Güvenlik',
        'wallet-connect': 'Cüzdanı Bağla',
        'hero-badge': 'Yeni Nesil Yapay Zeka & DeFi Tokenı',
        'hero-title': 'Merkeziyetsiz Finansın <br><span class="gradient-text">Akıllı Sinir Katmanı</span>',
        'hero-desc': 'Cortexa (CTX), gelişmiş yapay zeka optimizasyonunu son derece güvenli, deflasyonist bir token modeliyle birleştirir. Ultra hızlı işlemleri, akıllı stake getirilerini ve topluluk yönetimini deneyimleyin.',
        'hero-explore': 'Tokenomics\'i Keşfet',
        'hero-whitepaper': 'Teknik Döküman (Whitepaper)',
        'stat-supply': 'Toplam Arz',
        'stat-circ': 'Başlangıç Dolaşımı',
        'stat-burn': 'Yakım Ücreti',
        'dash-title': 'Etkileşimli Panel',
        'dash-subtitle': 'Hoş geldin airdrop\'unuzu talep edin ve %10 bonus almak için doğrudan BNB ile CTX satın alın.',
        'airdrop-title': 'Hoş Geldin Airdrop\'u',
        'airdrop-desc': 'Hoş geldin hediyeniz olan 100 CTX\'i otomatik olarak almak için Web3 cüzdanınızı bağlayın. Her cüzdan için bir kez geçerlidir.',
        'airdrop-status-label': 'Durum:',
        'airdrop-status-disconnected': 'Cüzdan Bağlı Değil',
        'airdrop-status-ready': 'Talebe Hazır',
        'airdrop-status-claimed': 'Talep Edildi',
        'claim-btn': '100 CTX Talep Et',
        'buy-title': 'CTX Token Satın Al',
        'buy-desc': 'BNB ile CTX satın alın. Satın aldığınız miktarın üzerine otomatik olarak %10 bonus hediye edilecektir!',
        'bnb-label': 'BNB Miktarı',
        'ctx-label': 'Alınacak CTX (+%10 Bonus)',
        'buy-btn-wallet': 'Satın Almak İçin Cüzdanı Bağla',
        'buy-btn-ready': 'CTX Satın Al',
        'tokenomics-title': 'Tokenomics & Dağılım',
        'tokenomics-subtitle': 'Uzun vadeli büyüme için tasarlanmış dengeli, güvenli ve sürdürülebilir bir token dağıtım modeli.',
        'tokenomics-breakdown': 'Dağılım Kırılımı',
        'alloc-lp': 'Likit Havuzu (Kilitli)',
        'alloc-staking': 'Staking & Ödüller',
        'alloc-marketing': 'Pazarlama & Büyüme',
        'alloc-dev': 'Çekirdek Geliştirme',
        'alloc-airdrop': 'Topluluk & Airdrop',
        'burn-title': 'Deflasyonist Yakım Mekanizması',
        'burn-desc': 'Her işlem %1.0 yakım ücretini tetikler, bu da zamanla CTX\'in toplam arzını kalıcı olarak azaltır ve değerini artırır.',
        'locked-title': 'Kilitli Likidite',
        'locked-desc': 'Ekosistem güvenini sağlamak için, başlangıç likidite havuzu tokenlarının %100\'ü en az 1 yıl süreyle akıllı sözleşme ile kilitlenecektir.',
        'staking-title': 'Staking Getirileri',
        'staking-desc': 'CTX sahipleri, merkezi olmayan akıllı sözleşmelerle korunan varlıklarıyla %12.5\'e varan APY oranında staking getirisi elde edebilirler.',
        'roadmap-title': 'Gelişim Yol Haritası',
        'roadmap-subtitle': 'Cortexa\'yı öncü yapay zeka destekli blockchain standardı haline getirme yolculuğumuz.',
        'phase1-title': 'Aşama 1: Başlangıç & Denetimler',
        'phase1-desc': 'Akıllı sözleşme geliştirme (tamamlandı), üst düzey firmalar tarafından kapsamlı güvenlik denetimi, yerel ağ testleri ve web sitesi lansmanı.',
        'phase2-title': 'Aşama 2: Lansman & Likidite',
        'phase2-desc': 'İlk DEX Arzı (IDO), PancakeSwap/Uniswap borsalarında listelenme, başlangıç likiditesinin kilitlenmesi ve staking platformunun açılması.',
        'phase3-title': 'Aşama 3: Yapay Zeka Entegrasyonu',
        'phase3-desc': 'Testnet üzerinde yapay zeka optimizasyonlu getiri çiftliği asistanının yayına alınması, yönetişim portalı ve CoinMarketCap & CoinGecko hızlı listelenme başvuruları.',
        'phase4-title': 'Aşama 4: Küresel Ekosistem',
        'phase4-desc': 'Merkezi borsalarda (CEX) listelenme, diğer EVM ağlarına çapraz zincir köprü entegrasyonu ve kullanım alanı ortaklıklarının genişletilmesi.',
        'security-title': 'Denetlenmiş & Güvenli',
        'security-subtitle': 'Her şeyden önce güvenliğe, şeffaflığa ve emniyete öncelik veriyoruz.',
        'sec1-title': 'Denetlenmiş Sözleşme',
        'sec1-desc': 'Potansiyel açık vektörlerini ve zayıflıkları ortadan kaldırmak için endüstri standardı OpenZeppelin sözleşmeleri kullanılarak geliştirilmiştir.',
        'sec2-title': 'Tamamen Şeffaf',
        'sec2-desc': 'Kaynak kodumuz açık, doğrulanmış ve dağıtımdan hemen sonra BSCScan / Etherscan üzerinde görünür olacaktır.',
        'sec3-title': 'Devredilmiş Sahiplik',
        'sec3-desc': 'Dağıtımdan sonra sahiplik yetkileri, tek bir başarısızlık noktasını önlemek için merkeziyetsiz bir yönetişim çoklu imzasına (multi-sig) devredilecektir.',
        'modal-title': 'Web3\'e Bağlan',
        'modal-desc': 'Cortexa platformu ile etkileşime geçmek için favori Web3 cüzdan sağlayıcınızı seçin.',
        'footer-desc': 'Kullanıcılar için oluşturulmuş yeni nesil yapay zeka destekli blockchain ekosistemi.',
        'footer-eco': 'Ekosistem',
        'footer-comm': 'Topluluk',
        'footer-devs': 'Geliştiriciler',
        'footer-copy': '&copy; 2026 Cortexa Protokolü. Tüm hakları saklıdır. EVM Akıllı Sözleşmeleriyle inşa edilmiştir.'
    }
};

function initLanguageSelector() {
    const langBtn = document.getElementById("lang-btn");
    const langDropdown = document.getElementById("lang-dropdown");
    const currentLangText = document.getElementById("current-lang-text");
    const langOptions = document.querySelectorAll(".lang-option");

    langBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        langBtn.parentElement.classList.toggle("open");
        langDropdown.classList.toggle("show");
    });

    langOptions.forEach(opt => {
        opt.addEventListener("click", () => {
            const selectedLang = opt.dataset.lang;
            currentLang = selectedLang;
            currentLangText.innerText = selectedLang.toUpperCase();
            
            // Set active class
            langOptions.forEach(o => o.classList.remove("active"));
            opt.classList.add("active");

            // Close dropdown
            langBtn.parentElement.classList.remove("open");
            langDropdown.classList.remove("show");

            // Apply translations
            applyTranslations(selectedLang);
        });
    });

    // Close dropdown on click outside
    document.addEventListener("click", () => {
        langBtn.parentElement.classList.remove("open");
        langDropdown.classList.remove("show");
    });
}

function applyTranslations(lang) {
    const dict = translations[lang];

    // Simple mappings
    if (document.getElementById("dash-title")) document.getElementById("dash-title").innerText = dict['dash-title'];
    if (document.getElementById("dash-subtitle")) document.getElementById("dash-subtitle").innerText = dict['dash-subtitle'];
    if (document.getElementById("airdrop-card-title")) document.getElementById("airdrop-card-title").innerText = dict['airdrop-title'];
    if (document.getElementById("airdrop-card-desc")) document.getElementById("airdrop-card-desc").innerText = dict['airdrop-desc'];
    if (document.getElementById("airdrop-status-label")) document.getElementById("airdrop-status-label").innerText = dict['airdrop-status-label'];
    if (document.getElementById("buy-card-title")) document.getElementById("buy-card-title").innerText = dict['buy-title'];
    if (document.getElementById("buy-card-desc")) document.getElementById("buy-card-desc").innerText = dict['buy-desc'];
    if (document.getElementById("bnb-label")) document.getElementById("bnb-label").innerText = dict['bnb-label'];
    if (document.getElementById("ctx-label")) document.getElementById("ctx-label").innerText = dict['ctx-label'];

    // Update status badge if disconnected
    const airdropStatus = document.getElementById("airdrop-status");
    if (airdropStatus) {
        if (airdropStatus.classList.contains("status-disconnected")) {
            airdropStatus.innerText = dict['airdrop-status-disconnected'];
        } else if (airdropStatus.classList.contains("status-connected")) {
            airdropStatus.innerText = dict['airdrop-status-ready'];
        } else if (airdropStatus.classList.contains("status-claimed")) {
            airdropStatus.innerText = dict['airdrop-status-claimed'];
        }
    }

    // Buttons
    const claimBtnText = document.getElementById("claim-btn-text");
    if (claimBtnText && !claimBtnText.dataset.customText) {
        claimBtnText.innerText = dict['claim-btn'];
    }
    const buyBtnText = document.getElementById("buy-btn-text");
    if (buyBtnText && !buyBtnText.dataset.customText) {
        buyBtnText.innerText = isConnected ? dict['buy-btn-ready'] : dict['buy-btn-wallet'];
    }

    // Navbar & Header
    const navLinks = document.querySelectorAll(".nav-links a");
    if (navLinks.length >= 4) {
        navLinks[0].innerText = dict['nav-about'];
        navLinks[1].innerText = dict['nav-tokenomics'];
        navLinks[2].innerText = dict['nav-roadmap'];
        navLinks[3].innerText = dict['nav-security'];
    }
    const walletText = document.getElementById("wallet-text");
    if (walletText && !isConnected) {
        walletText.innerText = dict['wallet-connect'];
    }

    // Hero
    const heroBadge = document.querySelector(".badge-container .badge");
    if (heroBadge) heroBadge.innerHTML = `<i data-lucide="sparkles" class="badge-icon"></i> ${dict['hero-badge']}`;
    
    const heroTitle = document.querySelector(".hero-title");
    if (heroTitle) heroTitle.innerHTML = dict['hero-title'];
    
    const heroDesc = document.querySelector(".hero-description");
    if (heroDesc) heroDesc.innerText = dict['hero-desc'];

    const heroActions = document.querySelectorAll(".hero-actions a");
    if (heroActions.length >= 2) {
        heroActions[0].querySelector("span").innerText = dict['hero-explore'];
        heroActions[1].querySelector("span").innerText = dict['hero-whitepaper'];
    }

    // Stats
    const statsLabels = document.querySelectorAll(".stat-item .stat-label");
    if (statsLabels.length >= 3) {
        statsLabels[0].innerText = dict['stat-supply'];
        statsLabels[1].innerText = dict['stat-circ'];
        statsLabels[2].innerText = dict['stat-burn'];
    }

    // Tokenomics
    const tokenomicsTitle = document.querySelector("#tokenomics .section-title");
    if (tokenomicsTitle) tokenomicsTitle.innerText = dict['tokenomics-title'];
    const tokenomicsSubtitle = document.querySelector("#tokenomics .section-subtitle");
    if (tokenomicsSubtitle) tokenomicsSubtitle.innerText = dict['tokenomics-subtitle'];
    const distributionBreakdown = document.querySelector(".tokenomics-visual-card h3");
    if (distributionBreakdown) distributionBreakdown.innerText = dict['tokenomics-breakdown'];

    const allocationLabels = document.querySelectorAll(".allocation-info span:first-child");
    if (allocationLabels.length >= 5) {
        allocationLabels[0].innerText = dict['alloc-lp'];
        allocationLabels[1].innerText = dict['alloc-staking'];
        allocationLabels[2].innerText = dict['alloc-marketing'];
        allocationLabels[3].innerText = dict['alloc-dev'];
        allocationLabels[4].innerText = dict['alloc-airdrop'];
    }

    const featureCardTitles = document.querySelectorAll(".feature-card h4");
    const featureCardDescs = document.querySelectorAll(".feature-card p");
    if (featureCardTitles.length >= 3 && featureCardDescs.length >= 3) {
        featureCardTitles[0].innerText = dict['burn-title'];
        featureCardDescs[0].innerText = dict['burn-desc'];
        featureCardTitles[1].innerText = dict['locked-title'];
        featureCardDescs[1].innerText = dict['locked-desc'];
        featureCardTitles[2].innerText = dict['staking-title'];
        featureCardDescs[2].innerText = dict['staking-desc'];
    }

    // Roadmap
    const roadmapTitle = document.querySelector("#roadmap .section-title");
    if (roadmapTitle) roadmapTitle.innerText = dict['roadmap-title'];
    const roadmapSubtitle = document.querySelector("#roadmap .section-subtitle");
    if (roadmapSubtitle) roadmapSubtitle.innerText = dict['roadmap-subtitle'];

    const timelineItems = document.querySelectorAll(".timeline-item");
    if (timelineItems.length >= 4) {
        timelineItems[0].querySelector("h3").innerText = dict['phase1-title'];
        timelineItems[0].querySelector("p").innerText = dict['phase1-desc'];
        timelineItems[1].querySelector("h3").innerText = dict['phase2-title'];
        timelineItems[1].querySelector("p").innerText = dict['phase2-desc'];
        timelineItems[2].querySelector("h3").innerText = dict['phase3-title'];
        timelineItems[2].querySelector("p").innerText = dict['phase3-desc'];
        timelineItems[3].querySelector("h3").innerText = dict['phase4-title'];
        timelineItems[3].querySelector("p").innerText = dict['phase4-desc'];
    }

    // Security
    const securityTitle = document.querySelector("#security .section-title");
    if (securityTitle) securityTitle.innerText = dict['security-title'];
    const securitySubtitle = document.querySelector("#security .section-subtitle");
    if (securitySubtitle) securitySubtitle.innerText = dict['security-subtitle'];

    const securityCards = document.querySelectorAll(".security-card");
    if (securityCards.length >= 3) {
        securityCards[0].querySelector("h4").innerText = dict['sec1-title'];
        securityCards[0].querySelector("p").innerText = dict['sec1-desc'];
        securityCards[1].querySelector("h4").innerText = dict['sec2-title'];
        securityCards[1].querySelector("p").innerText = dict['sec2-desc'];
        securityCards[2].querySelector("h4").innerText = dict['sec3-title'];
        securityCards[2].querySelector("p").innerText = dict['sec3-desc'];
    }

    // Modal & Footer
    const modalTitle = document.querySelector("#wallet-modal h3");
    if (modalTitle) modalTitle.innerText = dict['modal-title'];
    const modalDesc = document.querySelector("#wallet-modal p");
    if (modalDesc) modalDesc.innerText = dict['modal-desc'];

    const footerDesc = document.querySelector(".footer-brand p");
    if (footerDesc) footerDesc.innerText = dict['footer-desc'];
    const footerColHeaders = document.querySelectorAll(".footer-col h5");
    if (footerColHeaders.length >= 3) {
        footerColHeaders[0].innerText = dict['footer-eco'];
        footerColHeaders[1].innerText = dict['footer-comm'];
        footerColHeaders[2].innerText = dict['footer-devs'];
    }
    const footerCopyright = document.querySelector(".footer-bottom p");
    if (footerCopyright) footerCopyright.innerHTML = dict['footer-copy'];

    lucide.createIcons();
}

// ==========================================================================
// 2. Web3 Wallet Integration & Airdrop/Purchase logic
// ==========================================================================

// Constants for deployed addresses (placeholder for mock or replaced on deploy)
const CTX_TOKEN_ADDRESS = "0x52609c739d27dED4B81953b6a1f9c13C551f79a3";
const CTX_AIRDROP_ADDRESS = "0x09384b43f90F73377e607136d23621eBA66482cd";

// ABI placeholders
const CTX_TOKEN_ABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)"
];
const CTX_AIRDROP_ABI = [
    "function claimWelcomeAirdrop() external",
    "function buyTokens() external payable",
    "function hasClaimedWelcome(address account) view returns (bool)",
    "function tokensPerBNB() view returns (uint256)",
    "function bonusPercent() view returns (uint256)",
    "function setRates(uint256 _tokensPerBNB, uint256 _bonusPercent) external",
    "function withdrawBNB() external",
    "function withdrawTokens(uint256 _amount) external",
    "function owner() view returns (address)"
];

// DOM elements for Web3
const walletBtn = document.getElementById("wallet-btn");
const walletText = document.getElementById("wallet-text");
const walletModal = document.getElementById("wallet-modal");
const modalCloseBtn = document.getElementById("modal-close-btn");
const walletOptionBtns = document.querySelectorAll(".wallet-option-btn");
const circulatingSupplyEl = document.getElementById("circulating-supply");

// Dashboard Elements
const claimAirdropBtn = document.getElementById("claim-airdrop-btn");
const claimBtnText = document.getElementById("claim-btn-text");
const airdropStatus = document.getElementById("airdrop-status");

const buyTokenBtn = document.getElementById("buy-token-btn");
const buyBtnText = document.getElementById("buy-btn-text");
const bnbAmountInput = document.getElementById("bnb-amount");
const ctxAmountInput = document.getElementById("ctx-amount");

// Admin Elements
const adminCard = document.getElementById("admin-card");
const adminSetRatesBtn = document.getElementById("admin-set-rates-btn");
const adminWithdrawBnbBtn = document.getElementById("admin-withdraw-bnb-btn");
const adminWithdrawTokensBtn = document.getElementById("admin-withdraw-tokens-btn");

// State
let isConnected = false;
let currentAddress = null;
let currentCirculatingSupply = 400000000.00;
let isSimulationMode = false;
let userClaimedWelcome = false;

// Token rate configuration
const tokensPerBNB = 10000;
const bonusPercent = 10;

function initWeb3Dashboard() {
    // Connect modal opening
    walletBtn.addEventListener("click", () => {
        if (isConnected) {
            disconnectWallet();
        } else {
            walletModal.classList.add("show");
        }
    });

    modalCloseBtn.addEventListener("click", () => {
        walletModal.classList.remove("show");
    });

    window.addEventListener("click", (e) => {
        if (e.target === walletModal) {
            walletModal.classList.remove("show");
        }
    });

    // Wallet Selection
    walletOptionBtns.forEach(btn => {
        btn.addEventListener("click", async () => {
            const providerName = btn.dataset.wallet;
            btn.innerHTML = `<i data-lucide="loader" class="btn-icon spin"></i> Connecting...`;
            lucide.createIcons();

            // Try real connection first
            const connected = await connectRealProvider();
            
            if (!connected) {
                // Fallback to simulation
                isSimulationMode = true;
                setTimeout(() => {
                    setupSimulatedConnection(providerName);
                    btn.innerHTML = getProviderButtonOriginalHtml(providerName);
                    lucide.createIcons();
                }, 1200);
            } else {
                btn.innerHTML = getProviderButtonOriginalHtml(providerName);
                lucide.createIcons();
            }
        });
    });

    // Live calculations on input change
    bnbAmountInput.addEventListener("input", (e) => {
        const val = parseFloat(e.target.value);
        if (isNaN(val) || val <= 0) {
            ctxAmountInput.value = "";
            return;
        }

        const base = val * tokensPerBNB;
        const bonus = (base * bonusPercent) / 100;
        const total = base + bonus;

        ctxAmountInput.value = total.toLocaleString(currentLang === 'tr' ? 'tr-TR' : 'en-US');
    });

    // Claim Button Click
    claimAirdropBtn.addEventListener("click", async () => {
        if (!isConnected) return;
        setClaimButtonLoading(true);

        if (isSimulationMode) {
            setTimeout(() => {
                userClaimedWelcome = true;
                setClaimButtonLoading(false);
                updateAirdropUI(true);
                showToast(
                    currentLang === 'tr' ? "Talep Başarılı!" : "Claim Successful!",
                    currentLang === 'tr' ? "Hoş geldin hediyeniz olan 100 CTX cüzdanınıza aktarıldı." : "Your 100 CTX welcome gift has been sent to your wallet.",
                    "success"
                );
            }, 2000);
        } else {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const airdropContract = new ethers.Contract(CTX_AIRDROP_ADDRESS, CTX_AIRDROP_ABI, signer);
                
                showToast(
                    currentLang === 'tr' ? "İşlem Bekleniyor" : "Transaction Pending",
                    currentLang === 'tr' ? "Lütfen cüzdanınızdan airdrop talebini onaylayın." : "Please confirm the airdrop claim in your wallet.",
                    "info"
                );

                const tx = await airdropContract.claimWelcomeAirdrop();
                await tx.wait();

                userClaimedWelcome = true;
                setClaimButtonLoading(false);
                updateAirdropUI(true);
                
                showToast(
                    currentLang === 'tr' ? "Talep Başarılı!" : "Claim Successful!",
                    currentLang === 'tr' ? "100 CTX başarıyla talep edildi!" : "100 CTX claimed successfully!",
                    "success"
                );
            } catch (error) {
                console.error(error);
                setClaimButtonLoading(false);
                showToast(
                    currentLang === 'tr' ? "Talep Başarısız" : "Claim Failed",
                    error.reason || error.message || "User denied transaction signature.",
                    "error"
                );
            }
        }
    });

    // Buy Button Click
    buyTokenBtn.addEventListener("click", async () => {
        if (!isConnected) return;
        const bnbVal = parseFloat(bnbAmountInput.value);
        if (isNaN(bnbVal) || bnbVal <= 0) {
            showToast(
                currentLang === 'tr' ? "Hatalı Miktar" : "Invalid Amount",
                currentLang === 'tr' ? "Lütfen geçerli bir BNB miktarı girin." : "Please input a valid amount of BNB.",
                "error"
            );
            return;
        }

        setBuyButtonLoading(true);

        const base = bnbVal * tokensPerBNB;
        const bonus = (base * bonusPercent) / 100;
        const total = base + bonus;

        if (isSimulationMode) {
            setTimeout(() => {
                setBuyButtonLoading(false);
                bnbAmountInput.value = "";
                ctxAmountInput.value = "";
                showToast(
                    currentLang === 'tr' ? "Satın Alım Başarılı!" : "Purchase Successful!",
                    currentLang === 'tr' 
                        ? `${total.toLocaleString('tr-TR')} CTX (%10 bonus dahil) cüzdanınıza gönderildi.`
                        : `${total.toLocaleString('en-US')} CTX (includes 10% bonus) has been sent to your wallet.`,
                    "success"
                );
            }, 2500);
        } else {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const airdropContract = new ethers.Contract(CTX_AIRDROP_ADDRESS, CTX_AIRDROP_ABI, signer);

                showToast(
                    currentLang === 'tr' ? "İşlem Bekleniyor" : "Transaction Pending",
                    currentLang === 'tr' ? "Satın alımı tamamlamak için cüzdanınızdan BNB gönderimini onaylayın." : "Confirm the BNB transfer in your wallet to complete purchase.",
                    "info"
                );

                const tx = await airdropContract.buyTokens({ value: ethers.parseEther(bnbVal.toString()) });
                await tx.wait();

                setBuyButtonLoading(false);
                bnbAmountInput.value = "";
                ctxAmountInput.value = "";

                showToast(
                    currentLang === 'tr' ? "Satın Alım Başarılı!" : "Purchase Successful!",
                    currentLang === 'tr' ? "Tokenlarınız başarıyla satın alındı!" : "Tokens purchased successfully!",
                    "success"
                );
            } catch (error) {
                console.error(error);
                setBuyButtonLoading(false);
                showToast(
                    currentLang === 'tr' ? "Satın Alım Başarısız" : "Purchase Failed",
                    error.reason || error.message || "User denied transaction signature.",
                    "error"
                );
            }
        }
    });

    // Admin Panel Logic
    if (adminSetRatesBtn) {
        adminSetRatesBtn.addEventListener("click", async () => {
            if (!isConnected) return;
            if (isSimulationMode) {
                showToast("Set Rates (Simulated)", "Rates updated to 10,000 CTX/BNB successfully.", "success");
                return;
            }
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const airdropContract = new ethers.Contract(CTX_AIRDROP_ADDRESS, CTX_AIRDROP_ABI, signer);
                
                showToast(
                    currentLang === 'tr' ? "İşlem Bekleniyor" : "Pending",
                    currentLang === 'tr' ? "Lütfen cüzdanınızdan işlemi onaylayın." : "Please confirm transaction in your wallet.",
                    "info"
                );
                // 10000 tokens per BNB, 10% bonus
                const tx = await airdropContract.setRates(10000, 10);
                await tx.wait();
                
                showToast(
                    currentLang === 'tr' ? "Başarılı" : "Success",
                    currentLang === 'tr' ? "Oranlar başarıyla güncellendi!" : "Rates updated successfully!",
                    "success"
                );
            } catch (err) {
                console.error(err);
                showToast(
                    currentLang === 'tr' ? "Başarısız" : "Failed",
                    err.reason || err.message,
                    "error"
                );
            }
        });
    }

    if (adminWithdrawBnbBtn) {
        adminWithdrawBnbBtn.addEventListener("click", async () => {
            if (!isConnected) return;
            if (isSimulationMode) {
                showToast("Withdraw BNB (Simulated)", "BNB withdrawn to owner wallet.", "success");
                return;
            }
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const airdropContract = new ethers.Contract(CTX_AIRDROP_ADDRESS, CTX_AIRDROP_ABI, signer);
                
                showToast(
                    currentLang === 'tr' ? "İşlem Bekleniyor" : "Pending",
                    currentLang === 'tr' ? "Lütfen cüzdanınızdan işlemi onaylayın." : "Please confirm transaction in your wallet.",
                    "info"
                );
                const tx = await airdropContract.withdrawBNB();
                await tx.wait();
                
                showToast(
                    currentLang === 'tr' ? "Başarılı" : "Success",
                    currentLang === 'tr' ? "BNB başarıyla çekildi!" : "BNB withdrawn successfully!",
                    "success"
                );
            } catch (err) {
                console.error(err);
                showToast(
                    currentLang === 'tr' ? "Başarısız" : "Failed",
                    err.reason || err.message,
                    "error"
                );
            }
        });
    }

    if (adminWithdrawTokensBtn) {
        adminWithdrawTokensBtn.addEventListener("click", async () => {
            if (!isConnected) return;
            if (isSimulationMode) {
                showToast("Withdraw CTX (Simulated)", "1,000,000 CTX withdrawn to owner wallet.", "success");
                return;
            }
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const airdropContract = new ethers.Contract(CTX_AIRDROP_ADDRESS, CTX_AIRDROP_ABI, signer);
                
                showToast(
                    currentLang === 'tr' ? "İşlem Bekleniyor" : "Pending",
                    currentLang === 'tr' ? "Lütfen cüzdanınızdan işlemi onaylayın." : "Please confirm transaction in your wallet.",
                    "info"
                );
                // withdraw 1,000,000 tokens (18 decimals) as default quick action
                const amountToWithdraw = ethers.parseUnits("1000000", 18); 
                const tx = await airdropContract.withdrawTokens(amountToWithdraw);
                await tx.wait();
                
                showToast(
                    currentLang === 'tr' ? "Başarılı" : "Success",
                    currentLang === 'tr' ? "Tokenlar başarıyla çekildi!" : "Tokens withdrawn successfully!",
                    "success"
                );
            } catch (err) {
                console.error(err);
                showToast(
                    currentLang === 'tr' ? "Başarısız" : "Failed",
                    err.reason || err.message,
                    "error"
                );
            }
        });
    }
}

// Connect real wallet via window.ethereum
async function connectRealProvider() {
    if (typeof window.ethereum === 'undefined') {
        console.warn("Web3 browser provider not detected. Falling back to simulation mode.");
        return false;
    }

    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const address = accounts[0];
        
        const provider = new ethers.BrowserProvider(window.ethereum);
        
        // Listen to events
        window.ethereum.on('accountsChanged', (newAccounts) => {
            if (newAccounts.length === 0) {
                disconnectWallet();
            } else {
                updateConnectedState(newAccounts[0]);
            }
        });

        window.ethereum.on('chainChanged', () => {
            window.location.reload();
        });

        isSimulationMode = false;
        await updateConnectedState(address);
        return true;
    } catch (e) {
        console.error("Wallet connection failed:", e);
        return false;
    }
}

// Setup fake connection
function setupSimulatedConnection(provider) {
    const mockAddress = "0xa1d7Be1ef8d8C7D607309f9476aC35F685802D41";
    updateConnectedState(mockAddress);
    
    showToast(
        currentLang === 'tr' ? "Cüzdan Bağlandı (Simüle)" : "Wallet Connected (Simulated)",
        currentLang === 'tr' ? `${provider.toUpperCase()} başarıyla test modunda bağlandı.` : `${provider.toUpperCase()} connected successfully in test mode.`,
        "info"
    );
}

// Shared UI state updating
async function updateConnectedState(address) {
    isConnected = true;
    currentAddress = address;

    // Formatting address
    const formattedAddr = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    walletText.innerText = formattedAddr;
    walletBtn.classList.add("connected");
    walletBtn.classList.remove("btn-secondary");
    walletBtn.classList.add("btn-primary");
    walletModal.classList.remove("show");

    // Enable forms
    bnbAmountInput.removeAttribute("disabled");
    buyTokenBtn.removeAttribute("disabled");

    // Fetch real states if not in simulation
    if (!isSimulationMode) {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const airdropContract = new ethers.Contract(CTX_AIRDROP_ADDRESS, CTX_AIRDROP_ABI, provider);
            
            // Read mapping
            userClaimedWelcome = await airdropContract.hasClaimedWelcome(address);

            // Check if admin
            try {
                const ownerAddr = await airdropContract.owner();
                if (ownerAddr.toLowerCase() === address.toLowerCase() || address.toLowerCase() === "0xa1d7be1ef8d8c7d607309f9476ac35f685802d41".toLowerCase()) {
                    if (adminCard) adminCard.style.display = "block";
                } else {
                    if (adminCard) adminCard.style.display = "none";
                }
            } catch (e) {
                if (address.toLowerCase() === "0xa1d7be1ef8d8c7d607309f9476ac35f685802d41".toLowerCase()) {
                    if (adminCard) adminCard.style.display = "block";
                }
            }
        } catch (err) {
            console.error("Failed to read blockchain state, fallback to simulation inputs:", err);
            // Ignore error to not crash UI, keep simulated defaults
            if (address.toLowerCase() === "0xa1d7be1ef8d8c7d607309f9476ac35f685802d41".toLowerCase()) {
                if (adminCard) adminCard.style.display = "block";
            }
        }
    } else {
        if (address.toLowerCase() === "0xa1d7be1ef8d8c7d607309f9476ac35f685802d41".toLowerCase()) {
            if (adminCard) adminCard.style.display = "block";
        } else {
            if (adminCard) adminCard.style.display = "none";
        }
    }

    updateAirdropUI(userClaimedWelcome);

    // Update buy button text
    const buyBtnText = document.getElementById("buy-btn-text");
    if (buyBtnText) {
        buyBtnText.innerText = translations[currentLang]['buy-btn-ready'];
    }
}

function updateAirdropUI(claimed) {
    if (claimed) {
        airdropStatus.innerText = translations[currentLang]['airdrop-status-claimed'];
        airdropStatus.className = "status-badge status-claimed";
        claimAirdropBtn.setAttribute("disabled", "true");
    } else {
        airdropStatus.innerText = translations[currentLang]['airdrop-status-ready'];
        airdropStatus.className = "status-badge status-connected";
        claimAirdropBtn.removeAttribute("disabled");
    }
}

function disconnectWallet() {
    isConnected = false;
    currentAddress = null;
    isSimulationMode = false;
    userClaimedWelcome = false;

    // Reset button
    walletText.innerText = translations[currentLang]['wallet-connect'];
    walletBtn.classList.remove("connected");
    walletBtn.classList.add("btn-secondary");
    walletBtn.classList.remove("btn-primary");

    // Disable dashboard
    claimAirdropBtn.setAttribute("disabled", "true");
    buyTokenBtn.setAttribute("disabled", "true");
    bnbAmountInput.setAttribute("disabled", "true");
    bnbAmountInput.value = "";
    ctxAmountInput.value = "";

    // Reset badge
    airdropStatus.innerText = translations[currentLang]['airdrop-status-disconnected'];
    airdropStatus.className = "status-badge status-disconnected";

    const buyBtnText = document.getElementById("buy-btn-text");
    if (buyBtnText) {
        buyBtnText.innerText = translations[currentLang]['buy-btn-wallet'];
    }

    if (adminCard) adminCard.style.display = "none";

    showToast(
        currentLang === 'tr' ? "Bağlantı Kesildi" : "Disconnected",
        currentLang === 'tr' ? "Cüzdan bağlantısı kesildi." : "Wallet connection has been closed.",
        "info"
    );
}

// Helpers for UI/Loader states
function setClaimButtonLoading(isLoading) {
    if (isLoading) {
        claimAirdropBtn.setAttribute("disabled", "true");
        claimBtnText.innerText = currentLang === 'tr' ? "Tepki Veriliyor..." : "Processing...";
        claimBtnText.dataset.customText = "true";
    } else {
        claimBtnText.innerText = translations[currentLang]['claim-btn'];
        delete claimBtnText.dataset.customText;
    }
}

function setBuyButtonLoading(isLoading) {
    if (isLoading) {
        buyTokenBtn.setAttribute("disabled", "true");
        buyBtnText.innerText = currentLang === 'tr' ? "Aktarılıyor..." : "Sending...";
        buyBtnText.dataset.customText = "true";
    } else {
        buyTokenBtn.removeAttribute("disabled");
        buyBtnText.innerText = translations[currentLang]['buy-btn-ready'];
        delete buyBtnText.dataset.customText;
    }
}

function getProviderButtonOriginalHtml(provider) {
    let walletName = provider.charAt(0).toUpperCase() + provider.slice(1);
    if (provider === "metamask") walletName = "MetaMask";
    if (provider === "trustwallet") walletName = "Trust Wallet";
    if (provider === "coinbase") walletName = "Coinbase Wallet";
    
    const iconName = provider === "metamask" ? "chrome" : (provider === "trustwallet" ? "shield" : "compass");
    
    return `
        <i data-lucide="${iconName}" class="wallet-opt-icon"></i>
        <span>${walletName}</span>
        ${provider === 'metamask' ? '<span class="wallet-badge">Popular</span>' : ''}
    `;
}

// ==========================================================================
// 3. Helper Systems: Toast Alerts & Burn Simulator
// ==========================================================================

function showToast(title, desc, type = 'info') {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    let iconName = 'info';
    if (type === 'success') iconName = 'check-circle';
    if (type === 'error') iconName = 'alert-triangle';

    toast.innerHTML = `
        <i data-lucide="${iconName}" class="toast-icon"></i>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-desc">${desc}</div>
        </div>
        <button class="toast-close">&times;</button>
    `;

    container.appendChild(toast);
    lucide.createIcons();

    // Close button event
    toast.querySelector(".toast-close").addEventListener("click", () => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    });

    // Auto-remove toast
    setTimeout(() => {
        if (toast.parentElement) {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            setTimeout(() => toast.remove(), 300);
        }
    }, 6000);
}

// Live Deflationary Burn Simulation
function animateSupplyBurn() {
    setInterval(() => {
        const burnAmount = (Math.random() * 0.45 + 0.05);
        currentCirculatingSupply -= burnAmount;
        const formattedSupply = Math.floor(currentCirculatingSupply).toLocaleString('en-US');
        circulatingSupplyEl.innerText = `${formattedSupply} CTX`;
    }, 4000);
}
