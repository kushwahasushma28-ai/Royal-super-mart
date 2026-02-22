document.addEventListener('DOMContentLoaded', () => {
    const quickAddButtons = document.querySelectorAll('.quick-add-btn');
    const cartCounterElement = document.getElementById('cart-counter');
    let cartItemCount = 0;

    quickAddButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent any default link behavior
            
            // 1. Set Loading State
            const btnText = this.querySelector('.btn-text');
            const btnIcon = this.querySelector('.btn-icon');
            
            // Prevent clicking again while processing
            if (this.classList.contains('loading') || this.classList.contains('success')) return;

            this.classList.add('loading');
            btnText.textContent = 'Adding...';
            btnIcon.textContent = '↻'; // Simple loading icon

            // 2. Simulate Network Request (Fake Delay for tactile feel)
            setTimeout(() => {
                // Remove loading state
                this.classList.remove('loading');
                
                // Add Success State
                this.classList.add('success');
                btnText.textContent = 'Added';
                btnIcon.textContent = '✓';

                // 3. Update Global Cart Counter
                cartItemCount++;
                cartCounterElement.textContent = cartItemCount;
                
                // Trigger the subtle pop animation on the cart counter
                cartCounterElement.classList.add('cart-pop');
                setTimeout(() => {
                    cartCounterElement.classList.remove('cart-pop');
                }, 300);

                // 4. Reset Button after 2 seconds so they can buy more
                setTimeout(() => {
                    this.classList.remove('success');
                    btnText.textContent = 'Quick Add';
                    btnIcon.textContent = '＋';
                }, 2000);

            }, 600); // 600ms artificial delay for the "processing" feel
        });
    });
});
