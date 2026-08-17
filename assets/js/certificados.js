document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox ? lightbox.querySelector('.lightbox-img') : null;
  const lightboxPdf = lightbox ? lightbox.querySelector('.lightbox-pdf') : null;
  const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

  const openLightbox = (src, isPdf) => {
    if (!lightbox) return;
    if (isPdf) {
      if (lightboxImg) {
        lightboxImg.classList.add('is-hidden');
      }
      if (lightboxPdf) {
        lightboxPdf.src = src;
        lightboxPdf.classList.add('is-active');
      }
    } else {
      if (lightboxImg) {
        lightboxImg.src = src;
        lightboxImg.classList.remove('is-hidden');
      }
      if (lightboxPdf) {
        lightboxPdf.src = '';
        lightboxPdf.classList.remove('is-active');
      }
    }
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    setTimeout(() => {
      if (lightboxImg) {
        lightboxImg.src = '';
        lightboxImg.classList.remove('is-hidden');
      }
      if (lightboxPdf) {
        lightboxPdf.src = '';
        lightboxPdf.classList.remove('is-active');
      }
    }, 300);
    document.body.style.overflow = '';
  };

  const bindPreviewClick = (preview) => {
    const openFor = () => {
      const pdfSrc = preview.getAttribute('data-pdf');
      if (pdfSrc) openLightbox(pdfSrc, true);
    };

    preview.addEventListener('click', openFor);

    preview.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openFor();
      }
    });
  };

  if (typeof pdfjsLib !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    const renderPdfPreview = async (previewEl) => {
      const pdfSrc = previewEl.getAttribute('data-pdf');
      if (!pdfSrc) return;

      const canvas = previewEl.querySelector('.pdf-preview__canvas');
      if (!canvas) return;

      try {
        const loadingTask = pdfjsLib.getDocument(pdfSrc);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);

        const containerWidth = previewEl.clientWidth || 300;
        const containerHeight = previewEl.clientHeight || 210;
        const unscaledViewport = page.getViewport({ scale: 1 });
        const scale = Math.min(
          containerWidth / unscaledViewport.width,
          containerHeight / unscaledViewport.height
        );
        const viewport = page.getViewport({ scale });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: canvas.getContext('2d'),
          viewport: viewport
        };

        await page.render(renderContext).promise;
        previewEl.classList.add('is-loaded');
      } catch (err) {
        console.warn('No se pudo previsualizar el PDF:', pdfSrc, err);
        previewEl.classList.remove('is-loaded');
      }
    };

    document.querySelectorAll('.certificado .pdf-preview').forEach((preview) => {
      renderPdfPreview(preview);
      bindPreviewClick(preview);
    });
  } else {
    document.querySelectorAll('.certificado .pdf-preview').forEach((preview) => {
      bindPreviewClick(preview);
    });
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });
});