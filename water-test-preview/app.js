(() => {
  'use strict';
  const config = window.AQUAFEEL_CONTENT;
  const copy = {
    en: {
      skip:'Skip to content',draft:'REVIEW DRAFT · Reviews, videos and booking connection pending',eyebrow:'AQUAFEEL SOLUTIONS ARIZONA',headline:'A little more clarity.\nA closer look at your water.',intro:'Get to know the team behind your free in-home water test. Then choose a time that works for you.',introCta:'Ready? Go to booking',reviewsEyebrow:'GET TO KNOW AQUAFEEL',reviewsTitle:'Hear from our customers.',storiesEyebrow:'IN THEIR OWN WORDS',storiesTitle:'Meet the people.\nHear their experiences.',bookingEyebrow:'YOUR NEXT STEP',bookingTitle:'Let’s start\nwith your water.',bookingText:'Book a free in-home water test with Aquafeel Solutions Arizona. Bring your questions—we’ll help you explore your water treatment options.',bookCta:'Book your free water test',bookingNote:'At your home · Free water test',privacy:'Privacy policy',terms:'Terms',previewEyebrow:'BOOKING PREVIEW',dialogTitle:'Choose a time for\nyour free water test.',calendarPending:'Scheduling connection pending',dialogDescription:'This is a review preview. The approved booking calendar will open here. No appointment has been booked and no information has been sent.',back:'Back to the page',close:'Close booking preview',reviewPending:'Review to be added',reviewHint:'Space reserved for an approved customer review.',videoPending:'Customer video to be added',videoHint:'Reserved for an approved testimonial.',pending:'CONTENT PENDING',english:'Customer experience · English',spanish:'Experiencia del cliente · Español',source:'Read the original review',caption:'Captions',liveEyebrow:'BOOK YOUR VISIT',liveDescription:'Choose an available time in the calendar below. Your appointment is only booked after confirmation from the scheduling service.',unavailable:'Booking is not available on this page yet. Please check back soon.'
    },
    es: {
      skip:'Ir al contenido',draft:'BORRADOR PARA REVISIÓN · Reseñas, videos y conexión de reservas pendientes',eyebrow:'AQUAFEEL SOLUTIONS ARIZONA',headline:'Conozca mejor\nel agua de su hogar.',intro:'Conozca al equipo que está detrás de su prueba de agua gratis a domicilio. Después, elija un horario que le convenga.',introCta:'¿Listo? Ir a la reserva',reviewsEyebrow:'CONOZCA AQUAFEEL',reviewsTitle:'Escuche a nuestros clientes.',storiesEyebrow:'EN SUS PROPIAS PALABRAS',storiesTitle:'Conozca a las personas.\nEscuche sus experiencias.',bookingEyebrow:'SU SIGUIENTE PASO',bookingTitle:'Empecemos\npor su agua.',bookingText:'Reserve una prueba de agua gratis a domicilio con Aquafeel Solutions Arizona. Traiga sus preguntas: le ayudaremos a explorar opciones de tratamiento de agua.',bookCta:'Reservar mi prueba de agua gratis',bookingNote:'A domicilio · Prueba de agua gratis',privacy:'Política de privacidad',terms:'Términos',previewEyebrow:'VISTA PREVIA DE RESERVAS',dialogTitle:'Elija un horario para\nsu prueba de agua gratis.',calendarPending:'Conexión de reservas pendiente',dialogDescription:'Esta es una vista previa para revisión. El calendario de reservas aprobado se abrirá aquí. No se ha reservado ninguna cita ni se ha enviado información.',back:'Volver a la página',close:'Cerrar la vista previa de reservas',reviewPending:'Reseña por agregar',reviewHint:'Espacio reservado para una reseña de cliente aprobada.',videoPending:'Video de cliente por agregar',videoHint:'Espacio reservado para un testimonio aprobado.',pending:'CONTENIDO PENDIENTE',english:'Experiencia del cliente · Inglés',spanish:'Experiencia del cliente · Español',source:'Leer la reseña original',caption:'Subtítulos',liveEyebrow:'RESERVE SU VISITA',liveDescription:'Elija un horario disponible en el calendario. Su cita solo estará reservada cuando reciba la confirmación del servicio de reservas.',unavailable:'Las reservas aún no están disponibles en esta página. Vuelva pronto.'
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
    config.reviews.forEach(item => {
      const source=safeHttps(item.sourceUrl);
      const ready=item.approved && item.quote && item.author && source;
      if(!ready && !config.reviewMode)return;
      const card=element('article','review-card');
      card.append(element('div','review-platform',item.platform));
      if(ready){
        card.append(element('blockquote','',item.quote),element('span','review-author',item.author));
        const link=element('a','review-source',t.source);link.href=source;link.target='_blank';link.rel='noopener noreferrer';card.append(link);
      } else {
        card.append(element('span','pending-label',t.reviewPending),element('p','pending-copy',t.reviewHint));
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
        const stage=element('div','video-stage');
        const icon=element('span','play-outline'); icon.setAttribute('aria-hidden','true');
        icon.innerHTML='<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m8 5 11 7-11 7Z"/></svg>';
        stage.append(icon,element('span','pending-label',t.pending),element('p','',t.videoPending));card.append(stage);
      }
      const label=element('div','video-label');label.append(element('h3','',item.name || title),element('span','',item.language==='es'?'ES':'EN'));card.append(label);videos.append(card);
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
