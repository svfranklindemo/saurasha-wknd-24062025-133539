async function fetchProductData() {
  try {
    const response = await fetch(window.location.origin + '/products/linenclubproducts.json');
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching product data:', error);
    return [];
  }
}

function getSkuFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('sku');
}

function createImageGallery(images) {
  const gallery = document.createElement('div');
  gallery.classList.add('pdp-gallery');
  
  const imageArray = images.split(',').map(img => img.trim());
  
  // Main image container
  const mainImageContainer = document.createElement('div');
  mainImageContainer.classList.add('pdp-main-image');
  
  const mainImage = document.createElement('img');
  mainImage.src = imageArray[0];
  mainImage.alt = 'Product Image';
  mainImage.loading = 'lazy';
  mainImageContainer.appendChild(mainImage);
  
  // Thumbnail container
  const thumbnailContainer = document.createElement('div');
  thumbnailContainer.classList.add('pdp-thumbnails');
  
  imageArray.forEach((imgSrc, index) => {
    const thumbnail = document.createElement('img');
    thumbnail.src = imgSrc;
    thumbnail.alt = `Product Image ${index + 1}`;
    thumbnail.classList.add('pdp-thumbnail');
    if (index === 0) thumbnail.classList.add('active');
    
    thumbnail.addEventListener('click', () => {
      mainImage.src = imgSrc;
      thumbnailContainer.querySelectorAll('.pdp-thumbnail').forEach(thumb => 
        thumb.classList.remove('active')
      );
      thumbnail.classList.add('active');
    });
    
    thumbnailContainer.appendChild(thumbnail);
  });
  
  gallery.appendChild(mainImageContainer);
  gallery.appendChild(thumbnailContainer);
  
  return gallery;
}

function createSizeSelector(sizes) {
  const sizeContainer = document.createElement('div');
  sizeContainer.classList.add('pdp-size-selector');
  
  const sizeLabel = document.createElement('div');
  sizeLabel.classList.add('pdp-size-label');
  sizeLabel.innerHTML = `
    <span>SIZE</span>
    <a href="#" class="size-guide">📏 SIZE GUIDE</a>
  `;
  
  const sizeOptions = document.createElement('div');
  sizeOptions.classList.add('pdp-size-options');
  
  const sizeArray = sizes.split(',').map(size => size.trim());
  
  sizeArray.forEach((size, index) => {
    const sizeButton = document.createElement('button');
    sizeButton.classList.add('pdp-size-button');
    sizeButton.textContent = size;
    sizeButton.addEventListener('click', () => {
      sizeOptions.querySelectorAll('.pdp-size-button').forEach(btn => 
        btn.classList.remove('selected')
      );
      sizeButton.classList.add('selected');
    });
    
    if (index === 0) sizeButton.classList.add('selected');
    sizeOptions.appendChild(sizeButton);
  });
  
  sizeContainer.appendChild(sizeLabel);
  sizeContainer.appendChild(sizeOptions);
  
  return sizeContainer;
}

function createProductInfo(product) {
  const productInfo = document.createElement('div');
  productInfo.classList.add('pdp-product-info');
  
  productInfo.innerHTML = `
    <div class="pdp-brand">${product.TAG}</div>
    <h1 class="pdp-title">${product.NAME}</h1>
    <div class="pdp-style-code">STYLE CODE: ${product.SKU}</div>
    <div class="pdp-price">${product.PRICE}</div>
    <div class="pdp-price-note">(Inclusive of all taxes)</div>
    <div class="pdp-stock">IN STOCK</div>
  `;
  
  return productInfo;
}

function createActionSection() {
  const actionSection = document.createElement('div');
  actionSection.classList.add('pdp-actions');
  
  actionSection.innerHTML = `
    <div class="pdp-wishlist">
      <button class="pdp-wishlist-btn">🤍</button>
    </div>
    <button class="pdp-add-to-bag">
      🛍️ ADD TO BAG
    </button>
    
    <div class="pdp-delivery">
      <div class="pdp-delivery-label">DELIVER TO</div>
      <div class="pdp-delivery-input">
        <input type="text" placeholder="Pincode" class="pdp-pincode-input">
        <button class="pdp-check-btn">CHECK</button>
      </div>
    </div>
    
    <div class="pdp-features">
      <div class="pdp-feature">
        <div class="pdp-feature-icon">🔄</div>
        <div class="pdp-feature-text">
          <div>7 Day Return</div>
          <div>Policy</div>
        </div>
      </div>
      <div class="pdp-feature">
        <div class="pdp-feature-icon">✅</div>
        <div class="pdp-feature-text">
          <div>Quality Assured</div>
        </div>
      </div>
      <div class="pdp-feature">
        <div class="pdp-feature-icon">🚚</div>
        <div class="pdp-feature-text">
          <div>Free shipping</div>
          <div>above 999</div>
        </div>
      </div>
    </div>
  `;
  
  return actionSection;
}

function createAccordionSection(product) {
  const accordionSection = document.createElement('div');
  accordionSection.classList.add('pdp-accordions');
  
  const accordions = [
    {
      title: 'PRODUCT DESCRIPTION',
      content: product.DESCRIPTION,
      isOpen: true
    },
    {
      title: 'PRODUCT DETAILS',
      content: product.DETAILS.replace(/\\n/g, '<br>')
    },
    {
      title: 'PRODUCT DECLARATION',
      content: product.DECLARATION.replace(/\\n/g, '<br>')
    },
    {
      title: 'DELIVERY AND RETURNS',
      content: 'Free shipping on orders above ₹999. Standard delivery takes 3-5 business days. Easy returns within 7 days of delivery.'
    }
  ];
  
  accordions.forEach(accordion => {
    const accordionItem = document.createElement('div');
    accordionItem.classList.add('pdp-accordion-item');
    if (accordion.isOpen) accordionItem.classList.add('open');
    
    accordionItem.innerHTML = `
      <div class="pdp-accordion-header">
        <span>${accordion.title}</span>
        <span class="pdp-accordion-icon">${accordion.isOpen ? '−' : '+'}</span>
      </div>
      <div class="pdp-accordion-content">
        <div class="pdp-accordion-text">${accordion.content}</div>
      </div>
    `;
    
    const header = accordionItem.querySelector('.pdp-accordion-header');
    header.addEventListener('click', () => {
      const isOpen = accordionItem.classList.contains('open');
      accordionItem.classList.toggle('open');
      const icon = accordionItem.querySelector('.pdp-accordion-icon');
      icon.textContent = isOpen ? '+' : '−';
    });
    
    accordionSection.appendChild(accordionItem);
  });
  
  return accordionSection;
}

function renderProductNotFound() {
  return `
    <div class="pdp-not-found">
      <h2>Product Not Found</h2>
      <p>The requested product could not be found.</p>
      <a href="/" class="button-primary">Return to Home</a>
    </div>
  `;
}

export default async function decorate(block) {
  const sku = getSkuFromUrl();
  
  if (!sku) {
    block.innerHTML = renderProductNotFound();
    return;
  }
  
  const products = await fetchProductData();
  const product = products.find(p => p.SKU === sku);
  
  if (!product) {
    block.innerHTML = renderProductNotFound();
    return;
  }
  
  // Clear existing content
  block.innerHTML = '';
  
  // Create main container
  const container = document.createElement('div');
  container.classList.add('pdp-container');
  
  // Create left column (gallery)
  const leftColumn = document.createElement('div');
  leftColumn.classList.add('pdp-left-column');
  leftColumn.appendChild(createImageGallery(product.IMAGES));
  
  // Create right column (product info)
  const rightColumn = document.createElement('div');
  rightColumn.classList.add('pdp-right-column');
  
  rightColumn.appendChild(createProductInfo(product));
  rightColumn.appendChild(createSizeSelector(product.Size));
  rightColumn.appendChild(createActionSection());
  rightColumn.appendChild(createAccordionSection(product));
  
  container.appendChild(leftColumn);
  container.appendChild(rightColumn);
  
  block.appendChild(container);
} 