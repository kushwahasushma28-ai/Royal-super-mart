document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sticky Navbar Shrink Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });

    // 2. Premium Quick-Add Logic
    const quickAddButtons = document.querySelectorAll('.quick-add-btn');
    const cartCounterElement = document.getElementById('cart-counter');
    let cartItemCount = 0;

    quickAddButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.classList.contains('loading') || this.classList.contains('success')) return;

            const btnText = this.querySelector('.btn-text');
            const btnIcon = this.querySelector('.btn-icon');
            
            // Loading State
            this.classList.add('loading');
            btnText.textContent = 'Adding...';
            btnIcon.textContent = '↻';

            // Fake Network Delay for tactile feel
            setTimeout(() => {
                this.classList.remove('loading');
                this.classList.add('success');
                btnText.textContent = 'Added';
                btnIcon.textContent = '✓';

                // Update Counter
                cartItemCount++;
                cartCounterElement.textContent = cartItemCount;
                
                // Animate Counter
                cartCounterElement.classList.add('cart-pop');
                setTimeout(() => {
                    cartCounterElement.classList.remove('cart-pop');
                }, 300);

                // Reset Button
                setTimeout(() => {
                    this.classList.remove('success');
                    btnText.textContent = 'Quick Add';
                    btnIcon.textContent = '＋';
                }, 2000);

            }, 600); 
        });
    });

    // 3. Contact Form Submission Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            
            btn.textContent = 'Sending...';
            btn.style.opacity = '0.7';

            setTimeout(() => {
                btn.textContent = 'Message Sent ✓';
                btn.style.opacity = '1';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.textContent = originalText;
                }, 3000);
            }, 1200);
        });
    }
});
