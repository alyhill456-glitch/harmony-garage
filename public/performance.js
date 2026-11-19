/* Additional customer-side features only. Existing app.js remains unchanged. */
(()=>{
  if(typeof services==='undefined') return;
  const categories=Object.keys(services), selected=new Map();
  const categoryBox=document.getElementById('estimateCategories'), optionBox=document.getElementById('estimateOptions');
  const selectionBox=document.getElementById('estimateSelected'), totalBox=document.getElementById('estimateTotal'), notice=document.getElementById('estimateNotice');
  const money=n=>'$'+n.toLocaleString('en-US');
  let active=categories[0];
  const groups={"Engine Swaps":true,"Drivetrain":true,"Tires & Brakes":false,"Performance Upgrades":false};
  function render(){
    categoryBox.replaceChildren();optionBox.replaceChildren();
    categories.forEach(category=>{const b=document.createElement('button');b.type='button';b.className='estimate-category'+(active===category?' active':'');b.textContent=category;b.setAttribute('aria-pressed',String(active===category));b.onclick=()=>{active=category;render()};categoryBox.append(b)});
    services[active].forEach(([name,price])=>{const row=document.createElement('label');row.className='estimate-option';const input=document.createElement('input');input.type='checkbox';input.checked=selected.has(name);input.setAttribute('aria-label','Add '+name);input.onchange=()=>{
      if(input.checked){if(groups[active]){services[active].forEach(([other])=>selected.delete(other))}selected.set(name,{price,category:active})}else selected.delete(name);
      notice.textContent='';render();
    };const title=document.createElement('span');title.className='estimate-name';title.textContent=name;const amount=document.createElement('span');amount.className='estimate-price';amount.textContent=money(price);row.append(input,title,amount);optionBox.append(row)});
    selectionBox.replaceChildren();if(!selected.size){const p=document.createElement('p');p.textContent='No upgrades selected yet.';selectionBox.append(p)}
    for(const [name,info] of selected){const line=document.createElement('div');line.className='estimate-line';const n=document.createElement('span');n.textContent=name;const p=document.createElement('strong');p.textContent=money(info.price);line.append(n,p);selectionBox.append(line)}
    totalBox.textContent=money([...selected.values()].reduce((sum,item)=>sum+item.price,0));
  }
  document.getElementById('estimateClear').onclick=()=>{selected.clear();notice.textContent='';render()};
  document.getElementById('estimateCopy').onclick=async()=>{
    if(!selected.size){notice.textContent='Select an upgrade first.';return}
    const total=[...selected.values()].reduce((sum,item)=>sum+item.price,0);
    const text=['HARMONY GARAGE — BUILD ESTIMATE',...Array.from(selected,([name,info])=>name+' — '+money(info.price)),'Estimated total: '+money(total),'Prices and availability confirmed in city.'].join('\n');
    try{await navigator.clipboard.writeText(text);notice.textContent='Build list copied!'}catch(e){notice.textContent='Copy unavailable in this browser.'}
  };
  render();
})();
