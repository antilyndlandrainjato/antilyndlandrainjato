// script.js
document.addEventListener('DOMContentLoaded', function() {
    // ========== GESTION DU MENU MOBILE ==========
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        // Ouvrir/Fermer le menu
        const toggleMenu = function() {
            nav.classList.toggle('active');
            
            // Gestion du body scroll
            if (nav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
            
            // Changer l'icône
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (nav.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        };
        
        menuToggle.addEventListener('click', toggleMenu);
        
        // Fermer le menu quand on clique sur un lien
        const navLinks = document.querySelectorAll('nav ul li a, nav .btn-contact');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    document.body.style.overflow = '';
                    const icon = menuToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            });
        });
        
        // Fermer le menu en cliquant à l'extérieur
        document.addEventListener('click', function(event) {
            if (nav.classList.contains('active')) {
                if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
                    nav.classList.remove('active');
                    document.body.style.overflow = '';
                    const icon = menuToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
        
        // Empêcher la propagation du clic sur le menu
        nav.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }
    
    // ========== EFFET DE SCROLL SUR HEADER ==========
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });
    }
    
    // ========== LIENS ACTIFS DANS LE MENU ==========
    const sections = document.querySelectorAll('section[id]');
    const navLi = document.querySelectorAll('nav ul li a');
    
    if (sections.length > 0 && navLi.length > 0) {
        window.addEventListener('scroll', function() {
            let current = '';
            const scrollPosition = window.scrollY + 100;
            
            sections.forEach(function(section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLi.forEach(function(li) {
                li.classList.remove('active');
                const href = li.getAttribute('href');
                if (href && href === '#' + current) {
                    li.classList.add('active');
                }
            });
        });
    }
    
    // ========== ANIMATION DE GALERIE ==========
    const galleryItems = document.querySelectorAll('.contoursary');
    if (galleryItems.length > 0) {
        galleryItems.forEach(function(item) {
            item.addEventListener('click', function() {
                const img = this.querySelector('.saryrite');
                if (img) {
                    openImageModal(img.src, img.alt);
                }
            });
        });
    }
    
    // ========== MODAL POUR LES IMAGES ==========
    function openImageModal(src, alt) {
        // Vérifier si le modal existe déjà
        let modal = document.querySelector('.image-modal');
        
        if (!modal) {
            // Créer le modal
            modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.innerHTML = `
                <div class="image-modal-content">
                    <span class="image-modal-close">&times;</span>
                    <img src="${src}" alt="${alt}">
                    <div class="image-modal-caption">${alt}</div>
                </div>
            `;
            document.body.appendChild(modal);
            
            // Fermeture du modal
            const closeBtn = modal.querySelector('.image-modal-close');
            closeBtn.addEventListener('click', function() {
                modal.classList.remove('active');
                setTimeout(function() {
                    modal.remove();
                }, 300);
                document.body.style.overflow = '';
            });
            
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    setTimeout(function() {
                        modal.remove();
                    }, 300);
                    document.body.style.overflow = '';
                }
            });
        } else {
            // Mettre à jour le modal existant
            const modalImg = modal.querySelector('img');
            const modalCaption = modal.querySelector('.image-modal-caption');
            modalImg.src = src;
            modalImg.alt = alt;
            modalCaption.textContent = alt;
        }
        
        // Afficher le modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // ========== ANIMATION AU SCROLL (FADE IN) ==========
    const fadeElements = document.querySelectorAll('.activite-recent-card1, .activite-recent-card2, .activite-recent-card3, .tranches-age-card, .avantage-card, .info-item, .bloc');
    
    if (fadeElements.length > 0) {
        // Ajouter la classe fade-in par défaut
        fadeElements.forEach(function(el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        const fadeInObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    fadeInObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        
        fadeElements.forEach(function(el) {
            fadeInObserver.observe(el);
        });
    }
    
    // ========== SMOOTH SCROLL AMÉLIORÉ ==========
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href !== '#') {
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    const headerHeight = header ? header.offsetHeight : 80;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Mettre à jour l'URL sans recharger
                    history.pushState(null, null, href);
                }
            }
        });
    });
    
    // ========== GESTION DU FORMULAIRE WHATSAPP ==========
    const whatsappForm = document.getElementById('whatsappForm');
    if (whatsappForm) {
        const sendToWhatsApp = function() {
            // Récupération des valeurs
            let nom = document.getElementById('nom') ? document.getElementById('nom').value.trim() : '';
            let telephone = document.getElementById('telephone') ? document.getElementById('telephone').value.trim() : '';
            let email = document.getElementById('email') ? document.getElementById('email').value.trim() : '';
            let message = document.getElementById('message') ? document.getElementById('message').value.trim() : '';
            
            // Validation des champs obligatoires
            if (nom === "") {
                showFormError('nom', 'Veuillez entrer votre nom.');
                return;
            }
            
            if (message === "") {
                showFormError('message', 'Veuillez entrer votre message.');
                return;
            }
            
            // Validation email si présent
            if (email !== "" && !isValidEmail(email)) {
                showFormError('email', 'Veuillez entrer un email valide.');
                return;
            }
            
            // Construction du message pour WhatsApp
            let whatsappMessage = "*Nouveau message depuis le site Antily NDL*%0A%0A";
            whatsappMessage += "*Nom :* " + encodeURIComponent(nom) + "%0A";
            
            if (telephone !== "") {
                whatsappMessage += "*Téléphone :* " + encodeURIComponent(telephone) + "%0A";
            }
            
            if (email !== "") {
                whatsappMessage += "*Email :* " + encodeURIComponent(email) + "%0A";
            }
            
            whatsappMessage += "%0A*Message :*%0A" + encodeURIComponent(message) + "%0A%0A";
            whatsappMessage += "*📅 Date :* " + new Date().toLocaleDateString('fr-FR') + "%0A";
            whatsappMessage += "*⏰ Heure :* " + new Date().toLocaleTimeString('fr-FR');
            
            // Numéro WhatsApp
            let phoneNumber = "261331233800";
            
            // Création du lien WhatsApp
            let whatsappUrl = "https://wa.me/" + phoneNumber + "?text=" + whatsappMessage;
            
            // Ouvrir WhatsApp dans un nouvel onglet
            window.open(whatsappUrl, '_blank');
            
            // Afficher un message de succès
            showFormSuccess();
            
            // Optionnel : réinitialiser le formulaire
            // document.getElementById('whatsappForm').reset();
        };
        
        // Attacher la fonction à l'objet window
        window.sendToWhatsApp = sendToWhatsApp;
        
        // Validation en temps réel
        const formInputs = whatsappForm.querySelectorAll('input, textarea');
        formInputs.forEach(function(input) {
            input.addEventListener('input', function() {
                removeFormError(input.id);
            });
        });
    }
    
    // ========== FONCTIONS UTILITAIRES POUR LE FORMULAIRE ==========
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showFormError(fieldId, message) {
        const field = document.getElementById(fieldId);
        if (!field) return;
        
        // Supprimer l'erreur existante
        removeFormError(fieldId);
        
        // Ajouter la classe d'erreur
        field.classList.add('error');
        
        // Ajouter le message d'erreur
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#ff4d4d';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '5px';
        
        field.parentNode.appendChild(errorDiv);
        
        // Focus sur le champ
        field.focus();
        
        // Supprimer l'erreur après 3 secondes
        setTimeout(function() {
            removeFormError(fieldId);
        }, 3000);
    }
    
    function removeFormError(fieldId) {
        const field = document.getElementById(fieldId);
        if (!field) return;
        
        field.classList.remove('error');
        
        const errorDiv = field.parentNode.querySelector('.form-error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    function showFormSuccess() {
        // Créer un message de succès temporaire
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success-message';
        successDiv.innerHTML = '<i class="fas fa-check-circle"></i> Message envoyé avec succès ! Vous allez être redirigé vers WhatsApp.';
        successDiv.style.position = 'fixed';
        successDiv.style.bottom = '20px';
        successDiv.style.right = '20px';
        successDiv.style.backgroundColor = '#25D366';
        successDiv.style.color = 'white';
        successDiv.style.padding = '12px 20px';
        successDiv.style.borderRadius = '10px';
        successDiv.style.fontSize = '14px';
        successDiv.style.zIndex = '9999';
        successDiv.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        successDiv.style.animation = 'slideInRight 0.3s ease';
        
        document.body.appendChild(successDiv);
        
        // Supprimer après 4 secondes
        setTimeout(function() {
            successDiv.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(function() {
                successDiv.remove();
            }, 300);
        }, 4000);
    }
    
    document.head.appendChild(style);
    
    // ========== PRÉVENTION DES CLICS DOUBLES SUR LE FORMULAIRE ==========
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        let isProcessing = false;
        
        whatsappBtn.addEventListener('click', function(e) {
            if (isProcessing) {
                e.preventDefault();
                return;
            }
            
            isProcessing = true;
            
            // Appeler la fonction d'envoi
            if (typeof window.sendToWhatsApp === 'function') {
                window.sendToWhatsApp();
            }
            
            // Réactiver après 3 secondes
            setTimeout(function() {
                isProcessing = false;
            }, 3000);
        });
    }
    
    // ========== GESTION DU REDIMENSIONNEMENT DE LA FENÊTRE ==========
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Fermer le menu mobile si la fenêtre est agrandie
            if (window.innerWidth > 768 && nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                document.body.style.overflow = '';
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }, 250);
    });
    
    // ========== MESSAGE DE BIENVENUE CONSOLE ==========
    console.log('%c🌟 Antily NDL - Groupe Scout Catholique 🌟', 'color: #8550ff; font-size: 16px; font-weight: bold;');
    console.log('%cSite optimisé et prêt à l\'emploi', 'color: #25D366; font-size: 12px;');
});