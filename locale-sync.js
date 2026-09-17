(()=>{
  const ES={
    'CASO':'CASO','DE':'DE','Básico':'Básico','Intermediário':'Intermedio','Avançado':'Avanzado','Especialista':'Experto',
    'Sem sintomas':'Sin síntomas','Sem diarreia':'Sin diarrea','Dor + distensão':'Dolor + distensión','Diarreia + flatulência':'Diarrea + flatulencia',
    'Preparo duvidoso':'Preparación dudosa','Elevação tardia':'Elevación tardía','Suspeita de sopro fraco':'Sospecha de soplo débil',
    'Sem elevação colônica':'Sin elevación colónica','Possível não respondedor':'Posible no respondedor','Erro técnico provável':'Probable error técnico',
    'Jejum inadequado':'Ayuno inadecuado','Basal muito elevado':'Basal muy elevado','Leituras zeradas':'Lecturas en cero',
    'Possível calibração / não respondedor':'Posible calibración / no respondedor','Vômito durante exame':'Vómito durante la prueba',
    'Exame interrompido':'Prueba interrumpida','Tabagismo antes do exame':'Tabaquismo antes de la prueba','Interferência pré-analítica':'Interferencia preanalítica',
    'Lactose':'Lactosa','Frutose':'Fructosa','Sacarose':'Sacarosa','Glicose':'Glucosa','Lactulose':'Lactulosa',
    'Substrato/Exame':'Sustrato/Prueba','Referência':'Referencia','Contexto':'Contexto',
    'Arraste para direita se a afirmação estiver correta; esquerda se estiver incorreta.':'Deslice hacia la derecha si la afirmación es correcta; hacia la izquierda si es incorrecta.',
    'Primeiro valide a qualidade técnica; depois o feedback mostra a interpretação clínica.':'Primero valide la calidad técnica; luego la retroalimentación mostrará la interpretación clínica.',
    'Analise a curva, o tempo, os gases e o contexto antes de escolher.':'Analice la curva, el tiempo, los gases y el contexto antes de elegir.',
    'Arraste o cartão ou use os botões.':'Deslice la tarjeta o use los botones.',
    'Escolha uma interpretação.':'Elija una interpretación.',
    'Banco':'Banco','casos':'casos','motor adaptativo prioriza competências com mais erros':'el motor adaptativo prioriza las competencias con más errores',
    'Correta / válida':'Correcta / válida','Incorreta / não válida':'Incorrecta / no válida',
    'Sua resposta':'Su respuesta','Esperado':'Esperado','Conceito':'Concepto','Confiança':'Confianza','Nível':'Nivel',
    'Resposta correta':'Respuesta correcta','Resposta incorreta':'Respuesta incorrecta','Onde você errou':'Dónde se equivocó','Ponto de confirmação':'Punto de confirmación',
    'A interpretação está de acordo com o critério treinado.':'La interpretación está de acuerdo con el criterio entrenado.',
    'Compare sua decisão com o critério treinado.':'Compare su decisión con el criterio entrenado.',
    'Erro com alta confiança: este conceito terá prioridade na revisão.':'Error con alta confianza: este concepto tendrá prioridad en la revisión.'
  };
  const PT={}; Object.entries(ES).forEach(([p,e])=>PT[e]=p);
  function replaceText(s,map){
    if(!s) return s;
    let r=s;
    Object.entries(map).sort((a,b)=>b[0].length-a[0].length).forEach(([a,b])=>{r=r.split(a).join(b)});
    if(map===ES){
      r=r.replace(/Basal H₂:/g,'Basal H₂:').replace(/Maior CH₄:/g,'CH₄ máximo:').replace(/Queda aos/g,'Caída a los');
      r=r.replace(/elevação/gi,m=>m[0]===m[0].toUpperCase()?'Elevación':'elevación').replace(/sintomas/gi,'síntomas').replace(/intolerância/gi,'intolerancia').replace(/má absorção/gi,'malabsorción').replace(/acima do basal/gi,'sobre el basal').replace(/até 90 min/gi,'hasta 90 min').replace(/aos 120 min/gi,'a los 120 min');
    }
    return r;
  }
  function locale(){return (localStorage.getItem('nuvemLanguage')||document.documentElement.lang||'pt').toLowerCase().startsWith('es')?'es':'pt'}
  function sync(){
    const lang=locale(),map=lang==='es'?ES:PT;
    const ids=['caseNum','testType','claim','question','hint','bankNote','trainingStatus','nextCaseType','nextLevel','nextClaim','resultTitle','resultLead','mistakeTitle','resultWhy','detailsBox','finalText','reviewText','streakMessage'];
    ids.forEach(id=>{const el=document.getElementById(id); if(el&&!el.matches('[data-i18n]')) el.textContent=replaceText(el.textContent,map)});
    document.querySelectorAll('#meta div').forEach((el,idx)=>{
      const b=el.querySelector('b'); if(b) b.textContent=lang==='es'?['Sustrato/Prueba','Referencia','Contexto'][idx]:['Substrato/Exame','Referência','Contexto'][idx];
      el.childNodes.forEach(n=>{if(n.nodeType===3)n.nodeValue=replaceText(n.nodeValue,map)});
    });
    document.querySelectorAll('#diagnosisActions button,.error-cell,.priority').forEach(el=>{el.childNodes.forEach(n=>{if(n.nodeType===3)n.nodeValue=replaceText(n.nodeValue,map)})});
    const level=document.getElementById('levelChip'); if(level) level.textContent=replaceText(level.textContent,map);
    const select=document.getElementById('languageSelect'); if(select&&select.value!==lang) select.value=lang;
  }
  let queued=false; const obs=new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;sync()})});
  obs.observe(document.documentElement,{subtree:true,childList:true,characterData:true});
  window.addEventListener('DOMContentLoaded',sync); setTimeout(sync,0); setTimeout(sync,250);
  window.NUVEM_LOCALE_SYNC={sync};
})();