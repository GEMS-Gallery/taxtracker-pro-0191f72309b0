import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    const addTaxPayerForm = document.getElementById('addTaxPayerForm');
    const searchTaxPayerForm = document.getElementById('searchTaxPayerForm');
    const searchResult = document.getElementById('searchResult');
    const taxPayerTable = document.getElementById('taxPayerTable').getElementsByTagName('tbody')[0];

    addTaxPayerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const tid = document.getElementById('tid').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const address = document.getElementById('address').value;

        await backend.addTaxPayer(tid, firstName, lastName, address);
        addTaxPayerForm.reset();
        await updateTaxPayerTable();
    });

    searchTaxPayerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const searchTid = document.getElementById('searchTid').value;
        const result = await backend.searchTaxPayer(searchTid);

        if (result.length > 0) {
            const taxPayer = result[0];
            searchResult.innerHTML = `
                <h3>Search Result:</h3>
                <p>TID: ${taxPayer.tid}</p>
                <p>Name: ${taxPayer.firstName} ${taxPayer.lastName}</p>
                <p>Address: ${taxPayer.address}</p>
            `;
        } else {
            searchResult.innerHTML = '<p>No TaxPayer found with the given TID.</p>';
        }
    });

    async function updateTaxPayerTable() {
        const taxPayers = await backend.getAllTaxPayers();
        taxPayerTable.innerHTML = '';

        taxPayers.forEach(taxPayer => {
            const row = taxPayerTable.insertRow();
            row.insertCell(0).textContent = taxPayer.tid;
            row.insertCell(1).textContent = taxPayer.firstName;
            row.insertCell(2).textContent = taxPayer.lastName;
            row.insertCell(3).textContent = taxPayer.address;
        });
    }

    await updateTaxPayerTable();
});