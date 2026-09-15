(() => {
  'use strict';
  const config = window.AQUAFEEL_CONTENT;
  const copy = {
    en: {
      skip:'Skip to content',draft:'DESIGN PREVIEW · Illustrative images · Customer reviews and booking pending',eyebrow:'AQUAFEEL SOLUTIONS ARIZONA',headline:'Get to know Aquafeel.\nTake the next step for your water.',intro:'Explore customer reviews and stories, then schedule your free in-home water test with Aquafeel Solutions Arizona.',introCta:'Go to the booking section',reviewsEyebrow:'CUSTOMER REVIEWS',reviewsTitle:'What our customers say',storiesEyebrow:'CUSTOMER STORIES',storiesTitle:'Hear their stories',bookingEyebrow:'YOUR NEXT STEP',bookingTitle:'Ready for your free in-home water test?',bookingText:'Have questions about your water? Take the next step with a free test at your home from Aquafeel Solutions Arizona.',bookCta:'Book your free water test',previewCta:'Book your free water test',previewNote:'Preview only · Calendar connection pending',bookingNote:'At your home · Free water test',privacy:'Privacy policy',terms:'Terms',previewEyebrow:'BOOKING PREVIEW',dialogTitle:'Your booking will\nstart here.',calendarPending:'Scheduling connection pending',dialogDescription:'This is a review preview. The approved booking calendar will open here. No appointment has been booked and no information has been sent.',back:'Back to the page',close:'Close booking preview',reviewPending:'Customer review coming soon',reviewHint:'An approved review and its original source will appear here.',videoPending:'Customer testimonial',videoHint:'Illustrative image · Customer video pending',pending:'ILLUSTRATIVE PREVIEW',english:'English testimonial',spanish:'Testimonio en español',source:'Read the original review',caption:'Captions',liveEyebrow:'BOOK YOUR VISIT',liveDescription:'Choose an available time in the calendar below. Your appointment is only booked after confirmation from the scheduling service.',unavailable:'Booking is not available on this page yet. Please check back soon.',storiesIntro:'Customer perspectives in English and Spanish.',welcomeKicker:'THANK YOU FOR YOUR INTEREST',welcomeDetails:'Free in-home water test · English & Español',reviewThemes:["The in-home experience","Working with our local team","From first contact to follow-up"],
    },
    es: {
      skip:'Ir al contenido',draft:'VISTA PREVIA · Imágenes ilustrativas · Reseñas y reservas pendientes',eyebrow:'AQUAFEEL SOLUTIONS ARIZONA',headline:'Conozca Aquafeel.\nDé el siguiente paso para su agua.',intro:'Conozca las reseñas y experiencias de nuestros clientes y reserve su prueba de agua gratis a domicilio con Aquafeel Solutions Arizona.',introCta:'Ir a la sección de reservas',reviewsEyebrow:'RESEÑAS DE CLIENTES',reviewsTitle:'Lo que dicen nuestros clientes',storiesEyebrow:'EXPERIENCIAS DE CLIENTES',storiesTitle:'Conozca sus experiencias',bookingEyebrow:'SU SIGUIENTE PASO',bookingTitle:'¿Listo para su prueba de agua gratis a domicilio?',bookingText:'¿Tiene preguntas sobre el agua de su hogar? Dé el siguiente paso con una prueba gratis a domicilio de Aquafeel Solutions Arizona.',bookCta:'Reservar mi prueba de agua gratis',previewCta:'Reservar mi prueba de agua gratis',previewNote:'Vista previa · Calendario pendiente de conexión',bookingNote:'A domicilio · Prueba de agua gratis',privacy:'Política de privacidad',terms:'Términos',previewEyebrow:'VISTA PREVIA DE RESERVAS',dialogTitle:'Aquí podrá reservar\nsu prueba de agua.',calendarPending:'Conexión de reservas pendiente',dialogDescription:'Esta es una vista previa para revisión. El calendario de reservas aprobado se abrirá aquí. No se ha reservado ninguna cita ni se ha enviado información.',back:'Volver a la página',close:'Cerrar la vista previa de reservas',reviewPending:'Próximamente: reseña de cliente',reviewHint:'Aquí aparecerán una reseña aprobada y su fuente original.',videoPending:'Testimonio de cliente',videoHint:'Imagen ilustrativa · Video de cliente pendiente',pending:'VISTA ILUSTRATIVA',english:'Testimonio en inglés',spanish:'Testimonio en español',source:'Leer la reseña original',caption:'Subtítulos',liveEyebrow:'RESERVE SU VISITA',liveDescription:'Elija un horario disponible en el calendario. Su cita solo estará reservada cuando reciba la confirmación del servicio de reservas.',unavailable:'Las reservas aún no están disponibles en esta página. Vuelva pronto.',storiesIntro:'Experiencias de clientes en inglés y español.',welcomeKicker:'GRACIAS POR SU INTERÉS',welcomeDetails:'Prueba de agua gratis a domicilio · English & Español',reviewThemes:["La experiencia a domicilio","La atención de nuestro equipo","Desde el primer contacto"],
    }
  };
  let language = new URLSearchParams(location.search).get('lang') === 'es' ? 'es' : config.defaultLanguage;
  if (!copy[language]) language = 'en';
  const dialog = document.querySelector('#booking-dialog');
  const button = document.querySelector('#book-button');
  const setText = (node, value) => { node.textContent = value; node.style.whiteSpace = 'pre-line'; };
  const element = (tag, className, text) => { const node=document.createElement(tag); if(className)node.className=className; if(text)node.textContent=text; return node; };
  const safeHttps = value => { try { const url=new URL(value); return url.protocol==='https:' && !url.username && !url.password ? url.href : null; } catch { return null; } };
  const safeAsset = value => { if (!value) return null; if (/^assets\/[a-zA-Z0-9_./-]+$/.test(value) && !value.includes('..')) return value; return safeHttps(value); };
  const bookingUrl = () => { const value=safeHttps(config.booking.embedUrl); if(!config.booking.approved || !value)return null; const host=new URL(value).hostname; return ['api.leadconnectorhq.com','calendly.com'].includes(host) ? value : null; };

  function renderEvidence() {
    const t=copy[language];
    const reviews=document.querySelector('#review-grid'); reviews.replaceChildren();
    config.reviews.forEach((item,index) => {
      const source=safeHttps(item.sourceUrl);
      const ready=item.approved && item.quote && item.author && source;
      if(!ready && !config.reviewMode)return;
      const card=element('article','review-card');
      const logoFiles={Google:'google-logo.png',Yelp:'yelp-logo.svg',Trustpilot:'trustpilot-logo.svg'};
      const heading=element('div','review-platform platform-'+item.platform.toLowerCase());
      const logo=document.createElement('img');logo.src='assets/'+logoFiles[item.platform];logo.alt=item.platform;logo.width=140;logo.height=44;heading.append(logo);card.append(heading);
      card.setAttribute('aria-label',item.platform+(language==='es'?' — reseñas':' reviews'));
      if(ready){
        card.append(element('blockquote','',item.quote),element('span','review-author',item.author));
        const link=element('a','review-source',t.source);link.href=source;link.target='_blank';link.rel='noopener noreferrer';card.append(link);
      } else {
        card.append(element('h3','review-theme',t.reviewThemes[index]),element('p','pending-copy',t.reviewHint),element('span','review-status',t.reviewPending));
      }
      reviews.append(card);
    });
    reviews.closest('section').hidden = !reviews.children.length;
    const videos=document.querySelector('#video-grid');videos.replaceChildren();
    config.videos.forEach(item => {
      const src=safeAsset(item.src);
      const ready=item.approved && src;
      if(!ready && !config.reviewMode)return;
      const card=element('article','video-card');
      const title=item.language==='es' ? t.spanish : t.english;
      if(ready){
        const video=document.createElement('video'); video.controls=true; video.preload='none'; video.playsInline=true;video.src=src;video.setAttribute('aria-label',title);
        const poster=safeAsset(item.poster);if(poster)video.poster=poster;
        const captions=safeAsset(item.captions);if(captions){const track=document.createElement('track');track.kind='captions';track.srclang=item.language;track.label=item.language==='es'?'Español':'English';track.src=captions;video.append(track);}
        card.append(video);
      }else{
        const stage=element('div','video-stage illustrated-stage');
        const illustration=document.createElement('img');illustration.src=item.language==='es'?'assets/illustrative-carafe-arizona.png':'assets/illustrative-faucet-glass.png';illustration.alt=language==='es'?'Imagen ilustrativa generada de agua en una cocina de Arizona':'Generated illustrative image of water in an Arizona kitchen';illustration.width=1672;illustration.height=941;illustration.loading='lazy';stage.append(illustration);
        const icon=element('span','play-outline'); icon.setAttribute('aria-hidden','true');
        icon.innerHTML='<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m9 5 10 7-10 7Z"/></svg>';
        stage.append(icon,element('span','pending-label',t.pending));card.append(stage);
      }
      const label=element('div','video-label');label.append(element('h3','',item.name || title),element('span','',item.language==='es'?'ES':'EN'));card.append(label);if(!ready)card.append(element('p','illustration-note',t.videoHint));videos.append(card);
    });
    videos.closest('section').hidden = !videos.children.length;
  }

  function renderLanguage() {
    const t=copy[language];document.documentElement.lang=language;
    document.title=language==='es'?'Vista previa de la página | Aquafeel Solutions Arizona':'Landing page preview | Aquafeel Solutions Arizona';
    document.querySelector('meta[name="description"]').content=language==='es'?'Conozca Aquafeel Solutions Arizona y dé el siguiente paso para una prueba de agua gratis a domicilio.':'Get to know Aquafeel Solutions Arizona and take the next step toward a free in-home water test.';
    document.querySelectorAll('[data-copy]').forEach(node=>setText(node,t[node.dataset.copy]));
    document.querySelectorAll('[data-copy-aria]').forEach(node=>node.setAttribute('aria-label',t[node.dataset.copyAria]));
    document.querySelectorAll('[data-lang]').forEach(node=>node.setAttribute('aria-pressed',String(node.dataset.lang===language)));
    document.querySelector('.language-switch').setAttribute('aria-label',language==='es'?'Idioma de la página':'Page language');
    document.querySelector('.draft-bar').hidden=!config.reviewMode;
    if(config.reviewMode && !bookingUrl()){
      setText(button.querySelector('[data-copy="bookCta"]'),t.previewCta);
      setText(document.querySelector('.booking-note'),t.previewNote);
    }
    document.querySelector('.brand').setAttribute('aria-label',language==='es'?'Inicio de Aquafeel Solutions Arizona':'Aquafeel Solutions Arizona home');
    document.querySelector('.site-footer nav').setAttribute('aria-label',language==='es'?'Información legal':'Legal');
    renderEvidence();
  }
  document.querySelectorAll('[data-lang]').forEach(node=>node.addEventListener('click',()=>{
    language=node.dataset.lang;
    const url=new URL(location.href);url.searchParams.set('lang',language);history.replaceState(null,'',url);
    renderLanguage();
  }));
  button.addEventListener('click',()=>{
    const t=copy[language], url=bookingUrl();
    dialog.querySelector('iframe')?.remove();
    dialog.querySelector('.calendar-preview').hidden=Boolean(url);
    if(url){
      setText(dialog.querySelector('.eyebrow'),t.liveEyebrow);setText(document.querySelector('#dialog-description'),t.liveDescription);
      const frame=document.createElement('iframe');frame.className='booking-frame';frame.title=language==='es'?'Calendario de reservas':'Booking calendar';frame.referrerPolicy='no-referrer';frame.src=url;dialog.querySelector('.calendar-preview').after(frame);
    }else if(!config.reviewMode){
      setText(document.querySelector('#dialog-description'),t.unavailable);
      dialog.querySelector('.calendar-preview').hidden=true;
    }
    dialog.showModal();
  });
  dialog.querySelectorAll('.close-dialog,.dismiss-dialog').forEach(node=>node.addEventListener('click',()=>dialog.close()));
  dialog.addEventListener('close',()=>{dialog.querySelector('iframe')?.remove();button.focus();});
  document.querySelector('#year').textContent=new Date().getFullYear();
  renderLanguage();
})();

