let rebates=[];

fetch('rebates.json')
.then(r=>r.json())
.then(data=>{
 rebates=data;
 display(rebates);
});

document.getElementById('search').addEventListener('input', function(){
 let term=this.value.toLowerCase();
 let filtered=rebates.filter(r =>
 r.brand.toLowerCase().includes(term) ||
 r.products.join(' ').toLowerCase().includes(term)
 );
 display(filtered);
});

function display(items){
 let area=document.getElementById('results');
 area.innerHTML='';
 items.forEach(r=>{
 area.innerHTML += `
 <div class="card">
 <h2>${r.brand}</h2>
 <h3>${r.promotion}</h3>
 <p><b>Stackable:</b> ${r.stackable}</p>
 <p><b>Purchase Dates:</b> ${r.purchaseDates}</p>
 <p><b>Claim Deadline:</b> ${r.claimDeadline}</p>
 <p><b>Products:</b><br>${r.products.join('<br>')}</p>
 <p><b>Terms:</b><br>${r.terms}</p>
 </div>`;
 });
}
