const SignatureTemplates = {
    getSocialIcon(platform, url) {
        if (!url) return '';
        const icons = {
            linkedin: 'https://cdn-icons-png.flaticon.com/24/174/174857.png',
            twitter: 'https://cdn-icons-png.flaticon.com/24/5969/5969020.png',
            github: 'https://cdn-icons-png.flaticon.com/24/25/25231.png',
            instagram: 'https://cdn-icons-png.flaticon.com/24/2111/2111463.png',
            facebook: 'https://cdn-icons-png.flaticon.com/24/733/733547.png',
            youtube: 'https://cdn-icons-png.flaticon.com/24/1384/1384060.png',
            whatsapp: 'https://cdn-icons-png.flaticon.com/24/733/733585.png',
            malt: 'malt-svgrepo-com.svg',
            calendly: 'https://cdn-icons-png.flaticon.com/24/2693/2693507.png'
        };
        const iconSrc = icons[platform] || 'https://cdn-icons-png.flaticon.com/24/1006/1006771.png';
        return `<a href="${url}" target="_blank" style="display: inline-block; margin-right: 6px; text-decoration: none;"><img src="${iconSrc}" alt="${platform}" width="18" height="18" style="display: inline-block; border: 0; vertical-align: middle; border-radius: 3px;" /></a>`;
    },

    renderLegalInfo(data) {
        const parts = [];
        if (data.legalForm) parts.push(data.legalForm);
        if (data.siret) parts.push(`SIRET: ${data.siret}`);
        if (data.tva) parts.push(`TVA: ${data.tva}`);
        if (parts.length === 0) return '';
        return `<div style="font-size: 10px; color: #94a3b8; margin-top: 6px;">${parts.join(' • ')}</div>`;
    },

    renderEcoMessage(data) {
        if (!data.showEcoMessage || !data.ecoMessageText) return '';
        return `<div style="font-size: 10px; color: #16a34a; margin-top: 8px; font-style: italic;">🌱 ${data.ecoMessageText}</div>`;
    },

    renderBadge(data, bgColor, textColor) {
        if (!data.badgeText) return '';
        return `<span style="display: inline-block; background-color: ${bgColor || '#f1f5f9'}; color: ${textColor || '#0f172a'}; font-size: 10px; font-weight: bold; padding: 3px 10px; border-radius: 12px; margin-top: 4px;">${data.badgeText}</span>`;
    },

    renderBanner(data) {
        if (!data.bannerUrl) return '';
        const bannerHeight = data.bannerHeight || '50';
        let styleStr = 'display: block; width: 100%; border-radius: 6px; margin-top: 12px; object-fit: cover; object-position: center;';
        
        if (bannerHeight === '33') {
            styleStr += ' max-height: 50px;';
        } else if (bannerHeight === '50') {
            styleStr += ' max-height: 80px;';
        } else if (bannerHeight === '66') {
            styleStr += ' max-height: 110px;';
        } else if (bannerHeight === '75') {
            styleStr += ' max-height: 140px;';
        } else {
            styleStr += ' max-height: none; height: auto;';
        }

        const bannerImg = `<img src="${data.bannerUrl}" alt="Bannière promo" style="${styleStr}" />`;
        return data.bannerUrlLink ? `<a href="${data.bannerUrlLink}" target="_blank" style="text-decoration: none;">${bannerImg}</a>` : bannerImg;
    },

    getSocialsList(data) {
        const list = [
            this.getSocialIcon('linkedin', data.linkedin),
            this.getSocialIcon('github', data.github),
            this.getSocialIcon('malt', data.malt),
            this.getSocialIcon('twitter', data.twitter),
            this.getSocialIcon('instagram', data.instagram),
            this.getSocialIcon('calendly', data.calendly),
            this.getSocialIcon('facebook', data.facebook),
            this.getSocialIcon('youtube', data.youtube),
            this.getSocialIcon('whatsapp', data.whatsapp)
        ];

        if (data.customSocialUrl) {
            const iconSrc = data.customSocialIconUrl || 'https://cdn-icons-png.flaticon.com/24/1006/1006771.png';
            const name = data.customSocialName || 'Lien';
            list.push(`<a href="${data.customSocialUrl}" target="_blank" style="display: inline-block; margin-right: 6px; text-decoration: none;"><img src="${iconSrc}" alt="${name}" title="${name}" width="18" height="18" style="display: inline-block; border: 0; vertical-align: middle; border-radius: 3px;" /></a>`);
        }

        return list.filter(Boolean).join('');
    },

    studio(data) {
        const color = data.primaryColor || '#2563eb';
        const accent = data.secondaryColor || '#e11d48';
        const fontFamily = data.fontFamily || 'Arial, sans-serif';
        const frameStyle = data.customFrameStyle || 'card';
        const layoutPos = data.customLayoutPos || 'left';
        const separator = data.customSeparator || 'dot';
        const socials = this.getSocialsList(data);

        let sepChar = ' • ';
        if (separator === 'newline') sepChar = '<br>';

        const mediaChoice = data.customMediaChoice || 'both';
        const hasAvatar = !!data.avatarUrl && layoutPos !== 'none' && (mediaChoice === 'both' || mediaChoice === 'avatar');
        const hasLogo = !!data.logoUrl && layoutPos !== 'none' && (mediaChoice === 'both' || mediaChoice === 'logo');

        let avatarHtml = '';
        if (hasAvatar) {
            const borderRadius = data.avatarShape === 'square' ? '8px' : '50%';
            avatarHtml = `<img src="${data.avatarUrl}" alt="${data.fullName || ''}" width="72" height="72" style="display: block; border-radius: ${borderRadius}; object-fit: cover; border: 2px solid ${color};" />`;
        }

        let logoHtml = '';
        if (hasLogo) {
            logoHtml = `<img src="${data.logoUrl}" alt="Logo" width="80" style="display: block; max-height: 52px; object-fit: contain;" />`;
        }

        const contactItems = [];
        if (data.email) contactItems.push(`✉️ <a href="mailto:${data.email}" style="color: ${color}; text-decoration: none;">${data.email}</a>`);
        if (data.mobile) contactItems.push(`📱 ${data.mobile}`);
        if (data.phone) contactItems.push(`📞 ${data.phone}`);
        if (data.website) contactItems.push(`🌐 <a href="${data.website.startsWith('http') ? data.website : 'https://' + data.website}" target="_blank" style="color: ${color}; text-decoration: none;">${data.website.replace(/^https?:\/\//, '')}</a>`);

        const contactString = contactItems.join(sepChar);

        let containerStyle = `font-family: ${fontFamily}; font-size: 13px; line-height: 1.5; color: #334155; width: 100%; max-width: 560px;`;
        
        if (frameStyle === 'card') {
            containerStyle += ` background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px;`;
        } else if (frameStyle === 'left-accent') {
            containerStyle += ` border-left: 5px solid ${color}; padding: 12px 0 12px 18px; background: transparent;`;
        } else if (frameStyle === 'header-fill') {
            containerStyle += ` background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden;`;
        } else if (frameStyle === 'pill') {
            containerStyle += ` background: ${color}; color: #ffffff; border-radius: 36px; padding: 18px 24px;`;
        } else if (frameStyle === 'minimal') {
            containerStyle += ` background: transparent; padding: 6px 0;`;
        }

        const isPill = frameStyle === 'pill';
        const nameColor = isPill ? '#ffffff' : '#0f172a';
        const jobColor = isPill ? 'rgba(255,255,255,0.9)' : accent;

        const jobDeptCompany = [
            data.jobTitle,
            data.department ? `(${data.department})` : '',
            data.company ? `@ ${data.company}` : ''
        ].filter(Boolean).join(' ');

        const taglineHtml = data.tagline ? `<div style="font-size: 11px; font-style: italic; color: ${isPill ? 'rgba(255,255,255,0.8)' : '#64748b'}; margin-top: 3px;">${data.tagline}</div>` : '';

        if (frameStyle === 'header-fill') {
            return `
<table cellpadding="0" cellspacing="0" border="0" style="${containerStyle}">
    <tr>
        <td style="background: ${color}; padding: 14px 18px; color: #ffffff;">
            <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                <tr>
                    ${avatarHtml ? `<td valign="middle" style="padding-right: 14px; width: 60px;">${avatarHtml}</td>` : ''}
                    <td valign="middle">
                        <div style="font-size: 17px; font-weight: bold; color: #ffffff;">${data.fullName || 'Prénom Nom'}</div>
                        <div style="font-size: 12px; color: rgba(255,255,255,0.85);">${jobDeptCompany}</div>
                        ${taglineHtml}
                    </td>
                    ${logoHtml ? `<td valign="middle" align="right" style="padding-left: 12px;">${logoHtml}</td>` : ''}
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td style="padding: 16px 18px; background: #ffffff;">
            <div style="font-size: 12px; color: #475569;">${contactString}</div>
            ${data.address ? `<div style="font-size: 11px; color: #64748b; margin-top: 4px;">📍 ${data.address}</div>` : ''}
            ${socials ? `<div style="margin-top: 10px;">${socials}</div>` : ''}
            ${this.renderBanner(data)}
            ${this.renderLegalInfo(data)}
            ${this.renderEcoMessage(data)}
        </td>
    </tr>
</table>`.trim();
        }

        if (layoutPos === 'top') {
            return `
<table cellpadding="0" cellspacing="0" border="0" style="${containerStyle}">
    <tr>
        <td align="center" style="text-align: center;">
            ${(avatarHtml || logoHtml) ? `
            <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto 10px auto;">
                <tr>
                    ${avatarHtml ? `<td valign="middle" style="padding: 0 8px;">${avatarHtml}</td>` : ''}
                    ${logoHtml ? `<td valign="middle" style="padding: 0 8px;">${logoHtml}</td>` : ''}
                </tr>
            </table>
            ` : ''}
            <div style="font-size: 18px; font-weight: bold; color: ${nameColor};">${data.fullName || 'Prénom Nom'}</div>
            <div style="font-size: 12px; font-weight: 600; color: ${jobColor}; margin-top: 2px;">${jobDeptCompany}</div>
            ${taglineHtml}
            <div style="font-size: 12px; margin-top: 8px;">${contactString}</div>
            ${socials ? `<div style="margin-top: 10px;">${socials}</div>` : ''}
            ${this.renderBanner(data)}
            ${this.renderLegalInfo(data)}
            ${this.renderEcoMessage(data)}
        </td>
    </tr>
</table>`.trim();
        }

        if (layoutPos === 'right') {
            return `
<table cellpadding="0" cellspacing="0" border="0" style="${containerStyle}">
    <tr>
        <td valign="middle">
            <div style="font-size: 18px; font-weight: bold; color: ${nameColor};">${data.fullName || 'Prénom Nom'}</div>
            <div style="font-size: 12px; font-weight: 600; color: ${jobColor}; margin-top: 2px;">${jobDeptCompany}</div>
            ${taglineHtml}
            <div style="font-size: 12px; margin-top: 8px;">${contactString}</div>
            ${socials ? `<div style="margin-top: 10px;">${socials}</div>` : ''}
            ${this.renderBanner(data)}
            ${this.renderLegalInfo(data)}
            ${this.renderEcoMessage(data)}
        </td>
        ${(avatarHtml || logoHtml) ? `
        <td valign="middle" align="right" style="padding-left: 16px;">
            <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                    ${avatarHtml ? `<td valign="middle" style="padding-left: 8px;">${avatarHtml}</td>` : ''}
                    ${logoHtml ? `<td valign="middle" style="padding-left: 8px;">${logoHtml}</td>` : ''}
                </tr>
            </table>
        </td>
        ` : ''}
    </tr>
</table>`.trim();
        }

        return `
<table cellpadding="0" cellspacing="0" border="0" style="${containerStyle}">
    <tr>
        ${avatarHtml ? `<td valign="middle" style="padding-right: 16px; width: 72px;">${avatarHtml}</td>` : ''}
        <td valign="middle">
            <div style="font-size: 18px; font-weight: bold; color: ${nameColor};">${data.fullName || 'Prénom Nom'}</div>
            <div style="font-size: 12px; font-weight: 600; color: ${jobColor}; margin-top: 2px;">${jobDeptCompany}</div>
            ${taglineHtml}
            <div style="font-size: 12px; margin-top: 8px;">${contactString}</div>
            ${socials ? `<div style="margin-top: 10px;">${socials}</div>` : ''}
            ${this.renderBanner(data)}
            ${this.renderLegalInfo(data)}
            ${this.renderEcoMessage(data)}
        </td>
        ${logoHtml ? `<td valign="middle" align="right" style="padding-left: 16px; width: 85px;">${logoHtml}</td>` : ''}
    </tr>
</table>`.trim();
    },

    modern(data) {
        const color = data.primaryColor || '#0f172a';
        const accent = data.secondaryColor || '#e11d48';
        const fontFamily = data.fontFamily || 'Arial, sans-serif';
        const socials = this.getSocialsList(data);

        return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: ${fontFamily}; font-size: 13px; color: #1e293b; max-width: 560px; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; background: #ffffff;">
    <tr>
        <td valign="middle" style="background: ${color}; width: 42%; padding: 20px 16px; text-align: center; color: #ffffff;">
            ${data.logoUrl ? `<img src="${data.logoUrl}" alt="Logo" width="45" style="display: block; margin: 0 auto 10px auto; max-height: 45px; object-fit: contain;" />` : ''}
            <div style="font-size: 14px; font-weight: bold; letter-spacing: 0.5px; text-transform: uppercase; color: #ffffff;">${data.company || 'Nom Entreprise'}</div>
            ${data.tagline ? `<div style="font-size: 10px; color: rgba(255,255,255,0.75); margin-top: 4px;">${data.tagline}</div>` : ''}
        </td>
        <td valign="middle" style="width: 58%; padding: 20px 22px; background: #ffffff;">
            <div style="font-size: 17px; font-weight: bold; color: ${color};">${data.fullName || 'Prénom Nom'}</div>
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: ${accent}; letter-spacing: 0.5px; margin-top: 2px;">
                ${data.jobTitle || 'Intitulé du poste'}
            </div>
            
            <div style="margin-top: 12px; font-size: 12px; color: #475569; line-height: 1.5;">
                ${data.phone ? `<div>📞 ${data.phone}</div>` : ''}
                ${data.mobile ? `<div>📱 ${data.mobile}</div>` : ''}
                ${data.email ? `<div>✉️ <a href="mailto:${data.email}" style="color: ${color}; text-decoration: none;">${data.email}</a></div>` : ''}
                ${data.website ? `<div>🌐 <a href="${data.website.startsWith('http') ? data.website : 'https://' + data.website}" target="_blank" style="color: ${color}; text-decoration: none;">${data.website.replace(/^https?:\/\//, '')}</a></div>` : ''}
                ${data.address ? `<div style="font-size: 11px; color: #64748b; margin-top: 2px;">📍 ${data.address}</div>` : ''}
            </div>

            ${socials ? `<div style="margin-top: 10px;">${socials}</div>` : ''}
        </td>
    </tr>
</table>`.trim();
    },

    sleek(data) {
        const color = data.primaryColor || '#1e3a8a';
        const accent = data.secondaryColor || '#f43f5e';
        const fontFamily = data.fontFamily || 'Georgia, serif';
        const socials = this.getSocialsList(data);

        return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: ${fontFamily}; font-size: 13px; color: #ffffff; min-width: 500px; max-width: 560px; background: ${color}; border-radius: 40px; padding: 18px 24px;">
    <tr>
        ${data.avatarUrl ? `
        <td valign="middle" style="width: 80px; padding-right: 16px;">
            <img src="${data.avatarUrl}" alt="${data.fullName || ''}" width="80" height="80" style="display: block; border-radius: 50%; object-fit: cover; border: 3px solid ${accent};" />
        </td>
        ` : ''}
        <td valign="middle">
            <div style="font-size: 18px; font-weight: bold; color: #ffffff;">${data.fullName || 'Prénom Nom'}</div>
            <div style="font-size: 12px; color: rgba(255,255,255,0.85); font-style: italic;">${data.jobTitle || 'Intitulé du poste'} ${data.company ? '@ ' + data.company : ''}</div>

            <div style="margin-top: 8px; font-size: 11px; color: rgba(255,255,255,0.9); line-height: 1.4;">
                ${data.email ? `<span style="white-space: nowrap;">✉️ <a href="mailto:${data.email}" style="color: #ffffff; text-decoration: underline;">${data.email}</a></span> ` : ''}
                ${data.mobile ? `<span style="white-space: nowrap;">• 📱 ${data.mobile}</span> ` : ''}
                ${data.website ? `<br><span style="white-space: nowrap;">🌐 <a href="${data.website.startsWith('http') ? data.website : 'https://' + data.website}" target="_blank" style="color: #ffffff; text-decoration: underline;">${data.website.replace(/^https?:\/\//, '')}</a></span>` : ''}
            </div>
        </td>
        ${socials ? `
        <td valign="middle" align="right" style="padding-left: 14px; white-space: nowrap;">
            <div style="white-space: nowrap;">${socials}</div>
        </td>
        ` : ''}
    </tr>
</table>`.trim();
    },

    freelance(data) {
        const color = data.primaryColor || '#d97706';
        const fontFamily = data.fontFamily || 'Verdana, sans-serif';
        const socials = this.getSocialsList(data);

        return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: ${fontFamily}; font-size: 13px; line-height: 1.4; color: #1e293b; max-width: 550px;">
    <tr>
        <td>
            <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                <tr>
                    ${data.avatarUrl ? `
                    <td valign="middle" style="width: 76px; padding-right: 14px;">
                        <img src="${data.avatarUrl}" alt="${data.fullName || ''}" width="76" height="76" style="display: block; border-radius: 50%; object-fit: cover; background: ${color}; padding: 3px;" />
                    </td>
                    ` : ''}
                    <td valign="middle">
                        <div style="font-size: 18px; font-weight: bold; color: #0f172a;">${data.fullName || 'Prénom Nom'}</div>
                        <div style="font-size: 12px; color: #475569;">${data.jobTitle || 'Intitulé du poste'}</div>
                        <div style="font-size: 11px; color: #64748b; margin-top: 2px;">
                            ${data.email ? `E: <a href="mailto:${data.email}" style="color: ${color}; text-decoration: none;">${data.email}</a> ` : ''}
                            ${data.mobile ? `• T: ${data.mobile}` : ''}
                        </div>
                    </td>
                    ${socials ? `<td valign="middle" align="right">${socials}</td>` : ''}
                </tr>
            </table>

            <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; background: ${color}; border-radius: 12px; padding: 14px; margin-top: 14px; color: #ffffff;">
                <tr>
                    <td valign="middle">
                        <div style="font-size: 14px; font-weight: bold; color: #ffffff;">${data.tagline || 'Prise de rendez-vous'}</div>
                        <div style="font-size: 11px; color: rgba(255,255,255,0.9); margin-top: 2px;">Disponible pour de nouveaux projets</div>
                    </td>
                    ${data.ctaText && data.ctaUrl ? `
                    <td valign="middle" align="right">
                        <a href="${data.ctaUrl}" target="_blank" style="display: inline-block; background-color: #0f172a; color: #ffffff; padding: 7px 14px; border-radius: 6px; font-size: 11px; font-weight: bold; text-decoration: none;">${data.ctaText}</a>
                    </td>
                    ` : ''}
                </tr>
            </table>
        </td>
    </tr>
</table>`.trim();
    },

    executive(data) {
        const color = data.primaryColor || '#0f172a';
        const accent = data.secondaryColor || '#dc2626';
        const fontFamily = data.fontFamily || 'Helvetica, Arial, sans-serif';
        const socials = this.getSocialsList(data);

        return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: ${fontFamily}; font-size: 13px; line-height: 1.4; color: #334155; max-width: 560px; border-left: 5px solid ${accent}; padding-left: 18px;">
    <tr>
        <td valign="top">
            <div style="font-size: 19px; font-weight: 800; color: ${color};">${data.fullName || 'Prénom Nom'}</div>
            <div style="font-size: 12px; font-weight: 700; color: ${accent}; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 2px;">
                ${data.jobTitle || 'Intitulé du poste'} ${data.company ? '— ' + data.company : ''}
            </div>

            <div style="margin-top: 10px; font-size: 12px; color: #475569;">
                ${data.email ? `<div>✉️ <a href="mailto:${data.email}" style="color: ${accent}; text-decoration: none;">${data.email}</a></div>` : ''}
                ${data.mobile ? `<div>📱 ${data.mobile}</div>` : ''}
                ${data.website ? `<div>🌐 <a href="${data.website.startsWith('http') ? data.website : 'https://' + data.website}" target="_blank" style="color: ${color}; text-decoration: none;">${data.website.replace(/^https?:\/\//, '')}</a></div>` : ''}
            </div>

            ${socials ? `<div style="margin-top: 10px;">${socials}</div>` : ''}
            ${this.renderLegalInfo(data)}
        </td>
    </tr>
</table>`.trim();
    },

    compact(data) {
        const color = data.primaryColor || '#2563eb';
        const fontFamily = data.fontFamily || 'Segoe UI, Tahoma, sans-serif';
        const socials = this.getSocialsList(data);

        return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: ${fontFamily}; font-size: 13px; line-height: 1.5; color: #334155; width: 100%; max-width: 560px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px;">
    <tr>
        <td valign="middle" style="padding-right: 12px;">
            <div style="font-size: 14px; font-weight: bold; color: #0f172a; display: inline-block;">
                ${data.fullName || 'Prénom Nom'}
            </div>
            ${data.jobTitle ? `<span style="display: inline-block; font-size: 11px; background: ${color}; color: #ffffff; padding: 2px 8px; border-radius: 10px; margin-left: 8px; font-weight: 600; vertical-align: middle;">${data.jobTitle}</span>` : ''}
            
            <div style="font-size: 12px; color: #475569; margin-top: 6px; line-height: 1.4;">
                ${data.email ? `<a href="mailto:${data.email}" style="color: ${color}; text-decoration: none; font-weight: 500;">${data.email}</a>` : ''}
                ${data.mobile ? `<span style="color: #cbd5e1; margin: 0 6px;">•</span><span style="white-space: nowrap;">📱 ${data.mobile}</span>` : ''}
                ${data.phone ? `<span style="color: #cbd5e1; margin: 0 6px;">•</span><span style="white-space: nowrap;">📞 ${data.phone}</span>` : ''}
            </div>
        </td>
        ${socials ? `
        <td valign="middle" align="right" style="padding-left: 16px; white-space: nowrap; width: 1%; min-width: 80px;">
            <div style="white-space: nowrap; display: inline-block;">${socials}</div>
        </td>
        ` : ''}
    </tr>
</table>`.trim();
    },

    dualbrand(data) {
        const color = data.primaryColor || '#0284c7';
        const fontFamily = data.fontFamily || 'Arial, sans-serif';
        const socials = this.getSocialsList(data);

        return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: ${fontFamily}; font-size: 13px; line-height: 1.4; color: #334155; max-width: 550px;">
    <tr>
        ${data.avatarUrl ? `
        <td valign="top" style="padding-right: 14px; width: 70px;">
            <img src="${data.avatarUrl}" alt="${data.fullName || ''}" width="70" height="70" style="display: block; border-radius: 8px; object-fit: cover; border: 2px solid ${color};" />
        </td>
        ` : ''}
        <td valign="top">
            <div style="font-size: 17px; font-weight: bold; color: #0f172a;">${data.fullName || 'Prénom Nom'}</div>
            <div style="font-size: 12px; font-weight: 600; color: ${color};">${data.jobTitle || 'Intitulé du poste'}</div>
            ${data.company ? `<div style="font-size: 12px; color: #64748b;">${data.company}</div>` : ''}

            <div style="margin-top: 6px; font-size: 12px;">
                ${data.email ? `✉️ <a href="mailto:${data.email}" style="color: ${color}; text-decoration: none;">${data.email}</a>` : ''}
                ${data.mobile ? ` • 📱 ${data.mobile}` : ''}
            </div>
            ${socials ? `<div style="margin-top: 6px;">${socials}</div>` : ''}
        </td>
        ${data.logoUrl ? `
        <td valign="top" align="right" style="width: 80px;">
            <img src="${data.logoUrl}" alt="Logo" width="75" style="display: block; border-radius: 4px;" />
        </td>
        ` : ''}
    </tr>
</table>`.trim();
    },

    banner(data) {
        const color = data.primaryColor || '#ea580c';
        const fontFamily = data.fontFamily || 'Helvetica, Arial, sans-serif';
        const socials = this.getSocialsList(data);

        return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: ${fontFamily}; font-size: 13px; line-height: 1.4; color: #334155; max-width: 550px;">
    <tr>
        <td valign="top">
            <div style="font-size: 16px; font-weight: bold; color: #0f172a;">${data.fullName || 'Prénom Nom'}</div>
            <div style="font-size: 12px; color: ${color}; font-weight: 600;">${data.jobTitle || 'Intitulé du poste'} ${data.company ? '@ ' + data.company : ''}</div>
            <div style="font-size: 12px; color: #64748b; margin-top: 2px;">
                ${data.email ? `<a href="mailto:${data.email}" style="color: #64748b; text-decoration: none;">${data.email}</a>` : ''} 
                ${data.mobile ? `| ${data.mobile}` : ''}
            </div>
            ${socials ? `<div style="margin-top: 6px;">${socials}</div>` : ''}
            ${this.renderBanner(data)}
        </td>
    </tr>
</table>`.trim();
    },

    agencysales(data) {
        const color = data.primaryColor || '#2563eb';
        const fontFamily = data.fontFamily || 'Arial, sans-serif';
        const socials = this.getSocialsList(data);

        return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: ${fontFamily}; font-size: 13px; line-height: 1.4; color: #334155; max-width: 560px; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px;">
    <tr>
        <td valign="top">
            <div style="font-size: 18px; font-weight: bold; color: #0f172a;">${data.fullName || 'Prénom Nom'}</div>
            <div style="font-size: 13px; font-weight: bold; color: ${color};">${data.jobTitle || 'Intitulé du poste'}</div>
            
            ${this.renderBadge(data, '#fffbeb', '#d97706')}

            <div style="margin-top: 8px; font-size: 12px;">
                ${data.email ? `✉️ <a href="mailto:${data.email}" style="color: ${color}; text-decoration: none;">${data.email}</a>` : ''}
                ${data.mobile ? ` • 📱 ${data.mobile}` : ''}
            </div>

            ${socials ? `<div style="margin-top: 8px;">${socials}</div>` : ''}
        </td>
    </tr>
</table>`.trim();
    },

    ecogreen(data) {
        const color = data.primaryColor || '#16a34a';
        const fontFamily = data.fontFamily || 'Trebuchet MS, sans-serif';
        const socials = this.getSocialsList(data);

        return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: ${fontFamily}; font-size: 13px; line-height: 1.4; color: #14532d; max-width: 540px; background: #f0fdf4; border-left: 4px solid ${color}; padding: 14px; border-radius: 0 8px 8px 0;">
    <tr>
        <td valign="top">
            <div style="font-size: 17px; font-weight: bold; color: #14532d;">${data.fullName || 'Prénom Nom'}</div>
            <div style="font-size: 12px; font-weight: bold; color: ${color};">${data.jobTitle || 'Intitulé du poste'}</div>
            
            <div style="margin-top: 6px; font-size: 12px; color: #166534;">
                ${data.email ? `✉️ <a href="mailto:${data.email}" style="color: ${color}; text-decoration: none;">${data.email}</a>` : ''} 
                ${data.mobile ? ` | 📱 ${data.mobile}` : ''}
            </div>
            ${socials ? `<div style="margin-top: 6px;">${socials}</div>` : ''}
            ${this.renderEcoMessage(data)}
        </td>
    </tr>
</table>`.trim();
    },

    classic(data) {
        const color = data.primaryColor || '#475569';
        const fontFamily = data.fontFamily || 'Georgia, serif';
        const socials = this.getSocialsList(data);

        return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: ${fontFamily}; font-size: 14px; line-height: 1.5; color: #1e293b; max-width: 550px; border-top: 2px solid ${color}; border-bottom: 2px solid ${color}; padding: 14px 0;">
    <tr>
        <td valign="top">
            <div style="font-size: 18px; font-weight: bold; color: #0f172a; font-style: italic;">${data.fullName || 'Prénom Nom'}</div>
            <div style="font-size: 12px; color: #64748b; letter-spacing: 1px; text-transform: uppercase;">${data.jobTitle || 'Intitulé du poste'}</div>

            <div style="margin-top: 8px; font-size: 12px; color: #475569;">
                ${data.email ? `Email: <a href="mailto:${data.email}" style="color: ${color}; text-decoration: none;">${data.email}</a>` : ''}
                ${data.phone ? ` • Tél: ${data.phone}` : ''}
            </div>
            ${socials ? `<div style="margin-top: 8px;">${socials}</div>` : ''}
        </td>
    </tr>
</table>`.trim();
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SignatureTemplates;
}
