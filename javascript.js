const userContainer = document.getElementById('userContainer');
        const reloadBtn = document.getElementById('reloadBtn');
        const API = 'https://jsonplaceholder.typicode.com/users';

        function formatAddress(address) {
            if (!address) return 'Address not available';
            const suite = address.suite ? `${address.suite}, ` : '';
            const street = address.street ? `${address.street}, ` : '';
            const city = address.city ? `${address.city}` : '';
            const zipcode = address.zipcode ? ` - ${address.zipcode}` : '';
            return `${suite}${street}${city}${zipcode}`;
        }

        async function fetchUsers() {
            userContainer.innerHTML = '<p class="muted">Loading...</p>';
            reloadBtn.disabled = true;
            try {
                const resp = await fetch(API);
                if (!resp.ok) throw new Error(`HTTP error ${resp.status}`);
                const users = await resp.json();
                userContainer.innerHTML = '';

                users.forEach(user => {
                    const card = document.createElement('div');
                    card.className = 'user-card';
                    const addressStr = formatAddress(user.address);

                    card.innerHTML = `
        <h3><i class="fas fa-user"></i> ${user.name}</h3>
        <p><i class="fas fa-envelope"></i> <strong>Email:</strong> ${user.email}</p>
        <p><i class="fas fa-map-marker-alt"></i> <strong>Address:</strong> ${addressStr}</p>
    `;

                    userContainer.appendChild(card);
                });
            } catch (err) {
                userContainer.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
            } finally {
                reloadBtn.disabled = false;
            }
        }

        fetchUsers();
        reloadBtn.addEventListener('click', fetchUsers);