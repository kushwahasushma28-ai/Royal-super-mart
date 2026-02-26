document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Futuristic Typing Effect ---
    const taglineElement = document.querySelector('.hero-text p');
    if(taglineElement) {
        const originalText = taglineElement.textContent;
        taglineElement.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                taglineElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        }
        setTimeout(typeWriter, 1000);
    }

    // --- 2. 3D Mouse Parallax Effect for Hero Robot ---
    const heroImage = document.querySelector('.hero-image img');
    const heroSection = document.querySelector('.hero-section');

    if(heroImage && heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25; 
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            heroImage.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            heroImage.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
            heroImage.style.transition = 'transform 0.5s ease';
        });

        heroSection.addEventListener('mouseenter', () => {
            heroImage.style.transition = 'none';
        });
    }

    // --- 3. Working Shopping Cart ---
    let cart = [];
    const cartIcon = document.getElementById('cart-icon');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCartBtn = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');
    const cartCountEl = document.querySelector('.cart-count');
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');

    // Toggle Sidebar
    cartIcon.addEventListener('click', () => {
        cartSidebar.classList.add('open');
    });

    closeCartBtn.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
    });

    // Add to Cart Logic
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const name = e.target.getAttribute('data-name');
            const price = parseFloat(e.target.getAttribute('data-price'));
            
            cart.push({ name, price });
            
            // Visual feedback
            const originalText = e.target.textContent;
            e.target.textContent = 'Added!';
            e.target.style.background = 'var(--neon-blue)';
            e.target.style.color = 'var(--bg-dark)';
            setTimeout(() => {
                e.target.textContent = originalText;
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                e.target.style.color = 'var(--neon-purple)';
            }, 1000);

            updateCartUI();
            cartSidebar.classList.add('open'); 
        });
    });

    // Update Cart UI
    function updateCartUI() {
        cartItemsContainer.innerHTML = ''; 
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Cart is empty.</p>';
        } else {
            cart.forEach((item, index) => {
                total += item.price;
                
                const itemEl = document.createElement('div');
                itemEl.classList.add('cart-item');
                itemEl.innerHTML = `
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <span class="cart-item-price">$${item.price.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                    </div>
                    <button class="remove-item" data-index="${index}"><i class="fas fa-trash-alt"></i></button>
                `;
                cartItemsContainer.appendChild(itemEl);
            });
        }

        totalPriceEl.textContent = `$${total.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
        cartCountEl.textContent = cart.length;

        // Listeners for newly created trash cans
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.currentTarget.getAttribute('data-index');
                cart.splice(index, 1); 
                updateCartUI(); 
            });
        });
    }

    // --- 4. Navigation Burger Menu Toggle (Mobile) ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        navLinks.forEach((link, index) => {
            if (link.style.animation) { link.style.animation = ''; } 
            else { link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`; }
        });
        burger.classList.toggle('toggle');
    });

    // --- 5. Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            if(nav.classList.contains('nav-active')) { burger.click(); }
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // --- 6. Scroll Animations ---
    const hiddenElements = document.querySelectorAll('.hidden-element');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) { entry.target.classList.add('show-element'); }
        });
    }, { threshold: 0.1 });
    hiddenElements.forEach((el) => observer.observe(el));

    // Dynamic Year
    document.getElementById('year').textContent = new Date().getFullYear();
});
