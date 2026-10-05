document.addEventListener('DOMContentLoaded', () => {
    const templatesList = [
        { id: 'studio', name: '1. Studio Sur-Mesure', desc: 'Entièrement personnalisable : forme du cadre, position du visuel, séparateurs' },
        { id: 'modern', name: '2. Corporate Bicolore', desc: 'Multi-colonnes avec bloc de couleur à gauche et logo d\'entreprise' },
        { id: 'sleek', name: '3. Capsule Épurée', desc: 'Design arrondi moderne avec avatar et coordonnées intégrées' },
        { id: 'freelance', name: '4. Encadré CTA & Projets', desc: 'Bannière d\'action colorée et liens de contact direct' },
        { id: 'executive', name: '5. Exécutif & Mentions Légales', desc: 'Ligne d\'accent verticale avec encadré SIRET, TVA et forme juridique' },
        { id: 'compact', name: '6. Compact Horizon', desc: 'Signature sobre et fluide avec espacements aérés et icônes alignées' },
        { id: 'dualbrand', name: '7. Double Visuel (Photo + Logo)', desc: 'Affichage croisé photo de profil (gauche) et logo entreprise (droite)' },
        { id: 'banner', name: '8. Focus Bannière Promo', desc: 'Mise en avant d\'image promotionnelle et bouton d\'appel à l\'action' },
        { id: 'agencysales', name: '9. Commercial & Avis Clients', desc: 'Badge d\'évaluation client 5 étoiles et lien Calendly direct' },
        { id: 'ecogreen', name: '10. Éco-Responsable Liseré Vert', desc: 'Thème vert éco-responsable avec note de sensibilisation à l\'impression' },
        { id: 'classic', name: '11. Classique Traditionnel', desc: 'Style traditionnel élégant en police Georgia avec bordures haut et bas' }
    ];

    let currentTemplateIndex = 0;
    let currentTemplate = templatesList[0].id;
    let currentHtml = '';
    let isSecondaryManuallySet = false;

    const showcaseNumber = document.getElementById('showcase-template-number');
    const showcaseName = document.getElementById('showcase-template-name');
    const showcaseDesc = document.getElementById('showcase-template-desc');
    const showcaseLivePreview = document.getElementById('showcase-live-preview');
    const btnPrevTemplate = document.getElementById('btn-prev-template');
    const btnNextTemplate = document.getElementById('btn-next-template');
    const thumbBtns = document.querySelectorAll('.thumb-btn');

    const btnGotoCustomization = document.getElementById('btn-goto-customization');
    const customizationModal = document.getElementById('customization-modal');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const btnBackToModels = document.getElementById('btn-back-to-models');

    const form = document.getElementById('signature-form');
    const previewTarget = document.getElementById('signature-preview-target');
    const codeTarget = document.getElementById('signature-code-target');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    const primaryColorInput = document.getElementById('primaryColor');
    const primaryColorText = document.getElementById('primaryColorText');
    const secondaryColorInput = document.getElementById('secondaryColor');
    const secondaryColorText = document.getElementById('secondaryColorText');
    const paletteBtns = document.querySelectorAll('.palette-btn');

    const avatarUrlInput = document.getElementById('avatarUrl');
    const avatarFileInput = document.getElementById('avatarFile');
    const logoUrlInput = document.getElementById('logoUrl');
    const logoFileInput = document.getElementById('logoFile');
    const bannerUrlInput = document.getElementById('bannerUrl');
    const bannerFileInput = document.getElementById('bannerFile');

    const showDisclaimerCheckbox = document.getElementById('showDisclaimer');
    const disclaimerContainer = document.getElementById('disclaimer-container');
    const showEcoCheckbox = document.getElementById('showEcoMessage');
    const ecoContainer = document.getElementById('eco-container');

    const tabVisual = document.getElementById('tab-visual');
    const tabCode = document.getElementById('tab-code');
    const renderWrapper = document.getElementById('render-target-wrapper');
    const codeWrapper = document.getElementById('code-target-wrapper');

    const btnCopyRich = document.getElementById('btn-copy-rich');
    const btnCopyHtml = document.getElementById('btn-copy-html');
    const btnDownloadHtml = document.getElementById('btn-download-html');
    const btnReset = document.getElementById('btn-reset');

    const colorHarmonyPopup = document.getElementById('color-harmony-popup');
    const harmonySuggestedHex = document.getElementById('harmony-suggested-hex');
    const harmonySwatchBox = document.getElementById('harmony-swatch-box');
    const btnHarmonyYes = document.getElementById('btn-harmony-yes');
    const btnHarmonyNo = document.getElementById('btn-harmony-no');
    const dontAskColorHarmony = document.getElementById('dontAskColorHarmony');
    let pendingSuggestedColor = '';

    const resetConfirmPopup = document.getElementById('reset-confirm-popup');
    const btnResetYes = document.getElementById('btn-reset-yes');
    const btnResetNo = document.getElementById('btn-reset-no');

    const sampleData = {
        fullName: 'Prénom Nom',
        jobTitle: 'Intitulé du poste',
        company: 'Nom de l\'entreprise',
        department: 'Département / Équipe',
        tagline: 'Prise de rendez-vous',
        email: 'prenom.nom@exemple.com',
        phone: '+33 1 00 00 00 00',
        mobile: '+33 6 00 00 00 00',
        website: 'www.exemple.com',
        address: '123 Rue Exemple, 75000 Paris',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        avatarShape: 'circle',
        logoUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        linkedin: 'https://linkedin.com',
        malt: 'https://www.malt.fr/profile/ibanmarlats',
        github: 'https://github.com',
        calendly: 'https://calendly.com',
        twitter: 'https://x.com',
        instagram: '',
        siret: '000 000 000 00000',
        legalForm: 'Forme juridique & Capital',
        tva: 'FR 00 000000000',
        showDisclaimer: true,
        disclaimerText: 'Ce message et ses pièces jointes sont confidentiels et réservés à l\'usage exclusif de son destinataire.',
        bannerUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format&fit=crop&q=60',
        bannerUrlLink: 'https://exemple.com',
        ctaText: 'Prendre rendez-vous',
        ctaUrl: 'https://calendly.com',
        badgeText: 'Avis clients 5/5',
        showEcoMessage: true,
        ecoMessageText: 'Pensez à l\'environnement avant d\'imprimer ce message.',
        primaryColor: '#0f172a',
        secondaryColor: '#c59b27',
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        customFrameStyle: 'card',
        customLayoutPos: 'left',
        customMediaChoice: 'both',
        customSeparator: 'dot',
        customSocialName: '',
        customSocialUrl: '',
        customSocialIconUrl: ''
    };

    function hexToHSL(hex) {
        let r = parseInt(hex.substring(1, 3), 16) / 255;
        let g = parseInt(hex.substring(3, 5), 16) / 255;
        let b = parseInt(hex.substring(5, 7), 16) / 255;

        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
    }

    function hslToHex(h, s, l) {
        s /= 100;
        l /= 100;
        let c = (1 - Math.abs(2 * l - 1)) * s;
        let x = c * (1 - Math.abs((h / 60) % 2 - 1));
        let m = l - c / 2;
        let r = 0, g = 0, b = 0;

        if (0 <= h && h < 60) { r = c; g = x; b = 0; }
        else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
        else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
        else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
        else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
        else if (300 <= h && h < 360) { r = c; g = 0; b = x; }

        let rHex = Math.round((r + m) * 255).toString(16).padStart(2, '0');
        let gHex = Math.round((g + m) * 255).toString(16).padStart(2, '0');
        let bHex = Math.round((b + m) * 255).toString(16).padStart(2, '0');

        return `#${rHex}${gHex}${bHex}`;
    }

    function calculateHarmonizedSecondary(primaryHex) {
        const hsl = hexToHSL(primaryHex);
        const newHue = (hsl.h + 160) % 360;
        const newSat = Math.min(85, Math.max(50, hsl.s));
        const newLight = Math.min(55, Math.max(45, hsl.l));
        return hslToHex(newHue, newSat, newLight);
    }

    function getFormData() {
        return {
            fullName: document.getElementById('fullName').value.trim(),
            jobTitle: document.getElementById('jobTitle').value.trim(),
            company: document.getElementById('company').value.trim(),
            department: document.getElementById('department').value.trim(),
            tagline: document.getElementById('tagline').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            mobile: document.getElementById('mobile').value.trim(),
            website: document.getElementById('website').value.trim(),
            address: document.getElementById('address').value.trim(),
            avatarUrl: avatarUrlInput.value.trim(),
            avatarShape: document.querySelector('input[name="avatarShape"]:checked')?.value || 'circle',
            logoUrl: logoUrlInput.value.trim(),
            linkedin: document.getElementById('linkedin').value.trim(),
            malt: document.getElementById('malt').value.trim(),
            github: document.getElementById('github').value.trim(),
            calendly: document.getElementById('calendly').value.trim(),
            twitter: document.getElementById('twitter').value.trim(),
            instagram: document.getElementById('instagram').value.trim(),
            siret: document.getElementById('siret').value.trim(),
            legalForm: document.getElementById('legalForm').value.trim(),
            tva: document.getElementById('tva').value.trim(),
            showDisclaimer: showDisclaimerCheckbox.checked,
            disclaimerText: document.getElementById('disclaimerText').value.trim(),
            bannerUrl: bannerUrlInput.value.trim(),
            bannerHeight: document.getElementById('bannerHeight')?.value || '50',
            bannerUrlLink: document.getElementById('bannerUrlLink').value.trim(),
            ctaText: document.getElementById('ctaText').value.trim(),
            ctaUrl: document.getElementById('ctaUrl').value.trim(),
            badgeText: document.getElementById('badgeText').value.trim(),
            showEcoMessage: showEcoCheckbox.checked,
            ecoMessageText: document.getElementById('ecoMessageText').value.trim(),
            primaryColor: primaryColorInput.value,
            secondaryColor: secondaryColorInput.value,
            fontFamily: document.getElementById('fontFamily').value,
            customFrameStyle: document.getElementById('customFrameStyle')?.value || 'card',
            customLayoutPos: document.getElementById('customLayoutPos')?.value || 'left',
            customMediaChoice: document.getElementById('customMediaChoice')?.value || 'both',
            customSeparator: document.getElementById('customSeparator')?.value || 'dot',
            customSocialName: document.getElementById('customSocialName')?.value.trim() || '',
            customSocialUrl: document.getElementById('customSocialUrl')?.value.trim() || '',
            customSocialIconUrl: document.getElementById('customSocialIconUrl')?.value.trim() || ''
        };
    }

    function updateShowcaseUI() {
        const currentItem = templatesList[currentTemplateIndex];
        currentTemplate = currentItem.id;

        showcaseNumber.textContent = `Modèle ${currentTemplateIndex + 1} / 11`;
        showcaseName.textContent = currentItem.name;
        showcaseDesc.textContent = currentItem.desc;

        const data = getFormData();
        if (SignatureTemplates[currentTemplate]) {
            const html = SignatureTemplates[currentTemplate](data);
            showcaseLivePreview.innerHTML = html;
        }

        thumbBtns.forEach(btn => {
            if (btn.dataset.template === currentTemplate) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        renderSignature();
    }

    function renderSignature() {
        const data = getFormData();
        if (SignatureTemplates[currentTemplate]) {
            currentHtml = SignatureTemplates[currentTemplate](data);
            if (previewTarget) previewTarget.innerHTML = currentHtml;
            if (codeTarget) codeTarget.textContent = currentHtml;
            saveToLocalStorage(data);
        }
    }

    btnPrevTemplate.addEventListener('click', () => {
        currentTemplateIndex = (currentTemplateIndex - 1 + templatesList.length) % templatesList.length;
        updateShowcaseUI();
    });

    btnNextTemplate.addEventListener('click', () => {
        currentTemplateIndex = (currentTemplateIndex + 1) % templatesList.length;
        updateShowcaseUI();
    });

    thumbBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            currentTemplateIndex = index;
            updateShowcaseUI();
        });
    });

    function openCustomizationModal(pushHistory = true) {
        customizationModal.classList.remove('hidden');
        renderSignature();
        if (pushHistory && location.hash !== '#customization') {
            history.pushState({ modalOpen: true }, '', '#customization');
        }
    }

    function closeCustomizationModal(popHistory = true) {
        customizationModal.classList.add('hidden');
        updateShowcaseUI();
        if (popHistory && location.hash === '#customization') {
            history.back();
        }
    }

    btnGotoCustomization.addEventListener('click', () => {
        openCustomizationModal(true);
    });

    if (btnBackToModels) {
        btnBackToModels.addEventListener('click', () => {
            closeCustomizationModal(true);
        });
    }

    btnCloseModal.addEventListener('click', () => {
        closeCustomizationModal(true);
    });

    customizationModal.addEventListener('click', (e) => {
        if (e.target === customizationModal) {
            closeCustomizationModal(true);
        }
    });

    window.addEventListener('popstate', () => {
        if (location.hash === '#customization') {
            openCustomizationModal(false);
        } else {
            customizationModal.classList.add('hidden');
            updateShowcaseUI();
        }
    });

    function saveToLocalStorage(data) {
        try {
            localStorage.setItem('mailsignature_data_v4', JSON.stringify({
                template: currentTemplate,
                templateIndex: currentTemplateIndex,
                formData: data,
                isSecondaryManuallySet: isSecondaryManuallySet
            }));
        } catch (e) {}
    }

    function loadFromLocalStorage() {
        try {
            localStorage.removeItem('mailsignature_data_v3');
            const saved = localStorage.getItem('mailsignature_data_v4');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.templateIndex !== undefined) {
                    currentTemplateIndex = parsed.templateIndex;
                }
                if (parsed.isSecondaryManuallySet !== undefined) isSecondaryManuallySet = parsed.isSecondaryManuallySet;
                if (parsed.formData) populateForm(parsed.formData);
            } else {
                populateForm(sampleData);
            }
        } catch (e) {
            populateForm(sampleData);
        }
    }

    function populateForm(data) {
        Object.keys(data).forEach(key => {
            const el = document.getElementById(key);
            if (el) {
                if (el.type === 'checkbox') {
                    el.checked = data[key];
                } else {
                    el.value = data[key];
                }
            }
        });

        if (data.avatarShape) {
            const radio = document.querySelector(`input[name="avatarShape"][value="${data.avatarShape}"]`);
            if (radio) radio.checked = true;
        }

        if (data.primaryColor) {
            primaryColorInput.value = data.primaryColor;
            primaryColorText.value = data.primaryColor;
        }
        if (data.secondaryColor) {
            secondaryColorInput.value = data.secondaryColor;
            secondaryColorText.value = data.secondaryColor;
        }

        toggleToggles();
        updateShowcaseUI();
    }

    const handleFormUpdate = () => {
        renderSignature();
        const data = getFormData();
        if (SignatureTemplates[currentTemplate] && showcaseLivePreview) {
            showcaseLivePreview.innerHTML = SignatureTemplates[currentTemplate](data);
        }
    };

    form.addEventListener('input', handleFormUpdate);
    form.addEventListener('change', handleFormUpdate);

    const btnApplyColors = document.getElementById('btn-apply-colors');

    if (btnApplyColors) {
        btnApplyColors.addEventListener('click', () => {
            updateShowcaseUI();
            showToast('Couleurs et style appliqués !');
        });
    }

    function checkAndPromptColorHarmony(primaryHex) {
        if (localStorage.getItem('mailsignature_dont_ask_harmony') === 'true') {
            return;
        }
        pendingSuggestedColor = calculateHarmonizedSecondary(primaryHex);
        if (harmonySuggestedHex) harmonySuggestedHex.textContent = pendingSuggestedColor;
        if (harmonySwatchBox) harmonySwatchBox.style.backgroundColor = pendingSuggestedColor;
        if (colorHarmonyPopup) colorHarmonyPopup.classList.remove('hidden');
    }

    if (btnHarmonyYes) {
        btnHarmonyYes.addEventListener('click', () => {
            if (dontAskColorHarmony && dontAskColorHarmony.checked) {
                localStorage.setItem('mailsignature_dont_ask_harmony', 'true');
            }
            if (pendingSuggestedColor) {
                secondaryColorInput.value = pendingSuggestedColor;
                secondaryColorText.value = pendingSuggestedColor;
                updateShowcaseUI();
            }
            if (colorHarmonyPopup) colorHarmonyPopup.classList.add('hidden');
        });
    }

    if (btnHarmonyNo) {
        btnHarmonyNo.addEventListener('click', () => {
            if (dontAskColorHarmony && dontAskColorHarmony.checked) {
                localStorage.setItem('mailsignature_dont_ask_harmony', 'true');
            }
            if (colorHarmonyPopup) colorHarmonyPopup.classList.add('hidden');
        });
    }

    primaryColorInput.addEventListener('change', (e) => {
        const hex = e.target.value;
        primaryColorText.value = hex;
        updateShowcaseUI();
        checkAndPromptColorHarmony(hex);
    });

    primaryColorText.addEventListener('change', (e) => {
        if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
            const hex = e.target.value;
            primaryColorInput.value = hex;
            updateShowcaseUI();
            checkAndPromptColorHarmony(hex);
        }
    });

    secondaryColorInput.addEventListener('input', (e) => {
        secondaryColorText.value = e.target.value;
        updateShowcaseUI();
    });

    secondaryColorText.addEventListener('input', (e) => {
        if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
            secondaryColorInput.value = e.target.value;
            updateShowcaseUI();
        }
    });

    const fontFamilySelect = document.getElementById('fontFamily');
    if (fontFamilySelect) {
        fontFamilySelect.addEventListener('change', () => {
            updateShowcaseUI();
        });
    }

    paletteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const primary = btn.dataset.primary;
            const secondary = btn.dataset.secondary;
            primaryColorInput.value = primary;
            primaryColorText.value = primary;
            secondaryColorInput.value = secondary;
            secondaryColorText.value = secondary;
            isSecondaryManuallySet = true;
            updateShowcaseUI();
            showToast(`Palette appliquée !`);
        });
    });

    function toggleToggles() {
        disclaimerContainer.style.display = showDisclaimerCheckbox.checked ? 'block' : 'none';
        ecoContainer.style.display = showEcoCheckbox.checked ? 'block' : 'none';
    }

    showDisclaimerCheckbox.addEventListener('change', () => {
        toggleToggles();
        renderSignature();
    });
    showEcoCheckbox.addEventListener('change', () => {
        toggleToggles();
        renderSignature();
    });

    function compressImageFile(file, maxDimension, quality, callback) {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = (e) => {
            img.onload = () => {
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxDimension) {
                        height = Math.round((height * maxDimension) / width);
                        width = maxDimension;
                    }
                } else {
                    if (height > maxDimension) {
                        width = Math.round((width * maxDimension) / height);
                        height = maxDimension;
                    }
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
                callback(compressedDataUrl);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    function setupFileToInput(fileInput, urlInput, labelMsg, maxDim = 180) {
        if (!fileInput) return;
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                compressImageFile(file, maxDim, 0.75, (compressedUrl) => {
                    urlInput.value = compressedUrl;
                    updateShowcaseUI();
                    showToast(labelMsg);
                });
            }
        });
    }

    setupFileToInput(avatarFileInput, avatarUrlInput, 'Photo optimisée et chargée !', 160);
    setupFileToInput(logoFileInput, logoUrlInput, 'Logo optimisé et chargé !', 160);
    setupFileToInput(bannerFileInput, bannerUrlInput, 'Bannière optimisée et chargée !', 500);

    const customSocialIconFileInput = document.getElementById('customSocialIconFile');
    const customSocialIconUrlInput = document.getElementById('customSocialIconUrl');
    setupFileToInput(customSocialIconFileInput, customSocialIconUrlInput, 'Icône réseau personnalisée chargée !', 64);

    tabVisual.addEventListener('click', () => {
        tabVisual.classList.add('active');
        tabCode.classList.remove('active');
        renderWrapper.classList.add('active');
        codeWrapper.classList.remove('active');
    });

    tabCode.addEventListener('click', () => {
        tabCode.classList.add('active');
        tabVisual.classList.remove('active');
        codeWrapper.classList.add('active');
        renderWrapper.classList.remove('active');
    });

    const copyRichSignatureHandler = async () => {
        try {
            const dataObj = getFormData();
            const htmlToCopy = SignatureTemplates[currentTemplate] ? SignatureTemplates[currentTemplate](dataObj) : currentHtml;

            if (navigator.clipboard && window.ClipboardItem) {
                const blobHtml = new Blob([htmlToCopy], { type: 'text/html' });
                const blobText = new Blob([showcaseLivePreview ? showcaseLivePreview.innerText : 'Signature'], { type: 'text/plain' });
                const data = [new ClipboardItem({
                    'text/html': blobHtml,
                    'text/plain': blobText
                })];
                await navigator.clipboard.write(data);
                showToast('Signature copiée ! Collez-la directement dans Gmail/Outlook avec Ctrl+V.');
            } else {
                const range = document.createRange();
                const targetNode = showcaseLivePreview || previewTarget;
                range.selectNodeContents(targetNode);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                document.execCommand('copy');
                selection.removeAllRanges();
                showToast('Signature copiée ! Collez-la avec Ctrl+V.');
            }
        } catch (err) {
            console.error('Erreur de copie:', err);
            showToast('Erreur lors de la copie. Réessayez.');
        }
    };

    const btnCopyDirectShowcase = document.getElementById('btn-copy-direct-showcase');
    if (btnCopyDirectShowcase) {
        btnCopyDirectShowcase.addEventListener('click', copyRichSignatureHandler);
    }
    if (btnCopyRich) {
        btnCopyRich.addEventListener('click', copyRichSignatureHandler);
    }

    btnCopyHtml.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(currentHtml);
            showToast('Code HTML copié !');
        } catch (err) {}
    });

    btnDownloadHtml.addEventListener('click', () => {
        const blob = new Blob([currentHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'signature.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('Fichier signature.html téléchargé !');
    });

    btnReset.addEventListener('click', () => {
        if (resetConfirmPopup) resetConfirmPopup.classList.remove('hidden');
    });

    if (btnResetYes) {
        btnResetYes.addEventListener('click', () => {
            form.reset();
            localStorage.removeItem('mailsignature_dont_ask_harmony');
            localStorage.removeItem('mailsignature_data_v4');
            if (dontAskColorHarmony) dontAskColorHarmony.checked = false;
            isSecondaryManuallySet = false;
            populateForm(sampleData);
            if (resetConfirmPopup) resetConfirmPopup.classList.add('hidden');
            updateShowcaseUI();
            showToast('Formulaire réinitialisé !');
        });
    }

    if (btnResetNo) {
        btnResetNo.addEventListener('click', () => {
            if (resetConfirmPopup) resetConfirmPopup.classList.add('hidden');
        });
    }

    const tutoPopup = document.getElementById('tuto-popup');
    const btnOpenTuto = document.getElementById('btn-open-tuto');
    const btnCloseTuto = document.getElementById('btn-close-tuto');
    const tutoTabs = document.querySelectorAll('.tuto-tab');
    const tutoContentGmail = document.getElementById('tuto-content-gmail');
    const tutoContentOutlook = document.getElementById('tuto-content-outlook');

    if (btnOpenTuto) {
        btnOpenTuto.addEventListener('click', () => {
            if (tutoPopup) tutoPopup.classList.remove('hidden');
        });
    }

    if (btnCloseTuto) {
        btnCloseTuto.addEventListener('click', () => {
            if (tutoPopup) tutoPopup.classList.add('hidden');
        });
    }

    if (tutoPopup) {
        tutoPopup.addEventListener('click', (e) => {
            if (e.target === tutoPopup) {
                tutoPopup.classList.add('hidden');
            }
        });
    }

    tutoTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tutoTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const target = tab.dataset.tutoTab;
            if (target === 'gmail') {
                tutoContentGmail.classList.remove('hidden');
                tutoContentOutlook.classList.add('hidden');
            } else {
                tutoContentOutlook.classList.remove('hidden');
                tutoContentGmail.classList.add('hidden');
            }
        });
    });

    function showToast(message) {
        toastMessage.textContent = message;
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }

    loadFromLocalStorage();
    if (location.hash === '#customization') {
        openCustomizationModal(false);
    } else {
        updateShowcaseUI();
    }
});
