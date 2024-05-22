// Initialize Web3
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
    const web3 = new Web3(window.ethereum);

    document.getElementById('mint-button').addEventListener('click', async () => {
        try {
            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            // Your smart contract interaction logic here
            const accounts = await web3.eth.getAccounts();
            const contract = new web3.eth.Contract(ABI, contractAddress);

            // Assuming you have a minting function in your smart contract
            contract.methods.mintCard().send({ from: accounts[0] })
                .on('receipt', receipt => {
                    console.log('Card minted:', receipt);
                    // Display the minted card using p5.js
                    generateCard();
                })
                .on('error', error => {
                    console.error('Error minting card:', error);
                });
        } catch (error) {
            console.error('User denied account access', error);
        }
    });

    function generateCard() {
        // Function to refresh the p5.js canvas
        clear();
        setup();
    }
} else {
    console.log('MetaMask is not installed!');
    alert('Please install MetaMask to use this feature.');
}

document.addEventListener('DOMContentLoaded', () => {
    const cardPlaceholder = document.getElementById('card-placeholder');
    const mintButton = document.getElementById('mint-button');
    const carouselCards = document.querySelectorAll('.carousel-card');
    
    carouselCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            selectCard(index);
        });
    });

    mintButton.addEventListener('click', () => {
        mintCard();
    });

    function selectCard(index) {
        cardPlaceholder.innerHTML = '<img src="path/to/placeholder-card.png" alt="Selected Card">';
        mintButton.classList.remove('hidden');
    }

    function mintCard() {
        const seed = Date.now();
        cardPlaceholder.innerHTML = `<p>${seed}</p>`;
        mintButton.classList.add('hidden');
    }
});
