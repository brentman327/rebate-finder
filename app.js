let rebates = [];

fetch('rebates.json')
.then(r => r.json())
.then(data => {
    rebates = data;
    display(rebates);
});

document.getElementById('search').addEventListener('input', function(){
    const term = this.value.trim().toLowerCase();
    const filtered = rebates.filter(r =>
        r.brand.toLowerCase().includes(term)
    );
    display(filtered);
});

function display(items){
    const area = document.getElementById('results');
    area.innerHTML = '';

    if(items.length === 0){
        area.innerHTML = '<p>No rebates found.</p>';
        return;
    }

    items.forEach((r, index) => {
        area.innerHTML += `
        <div class="card" id="rebate-${index}">
            <h2>${r.brand}</h2>
            <h3>${r.promotion}</h3>
            <p><b>Rebate:</b> ${r.rebateAmount || ''}</p>
            <p><b>Stackable:</b> ${r.stackable || 'Not Specified'}</p>
            <p><b>Purchase Dates:</b> ${r.purchaseDates || ''}</p>
            <p><b>Claim Deadline:</b> ${r.claimDeadline || ''}</p>
            <p><b>Terms:</b><br>${r.terms || ''}</p>
            <button onclick="printRebate(${index})">Print Rebate</button>
        </div>`;
    });
}

function printRebate(index){
    const content = document.getElementById(`rebate-${index}`).innerHTML;
    const win = window.open('', '', 'width=800,height=600');
    win.document.write('<html><head><title>Rebate</title><link rel="stylesheet" href="style.css"></head><body>');
    win.document.write(content);
    win.document.write('</body></html>');
    win.document.close();
    win.print();
}
