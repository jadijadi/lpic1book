const convertInstagramToPhotoSwipe = () => {
  // inner function to return figure html
  const getFigureHTML = (
    image,
    height,
    width,
    thumbnail,
    username,
    name,
    instagramId
  ) => `
     <figure
        itemprop="associatedMedia"
        itemscope
        itemtype="http://schema.org/ImageObject"
     >
        <a
            href="${image}"
            itemprop="contentUrl"
            data-size="${width}x${height}"
        >
        <img
            src="${thumbnail}"
            itemprop="thumbnail"
            alt="Image description"
        />
        </a>
        <figcaption itemprop="caption description">
          <a href="https://www.instagram.com/p/${instagramId}/"
              target="_blank" rel="nofollow noopener noreferrer"
          >
              Photo
          </a> by
          <a href="https://www.instagram.com/${username}/"
              target="_blank" rel="nofollow noopener noreferrer"
          >
              ${name}
          </a>
        </figcaption>
     </figure>
    `;

  // Get div.elegant-instagram
  document.querySelectorAll(".elegant-instagram").forEach((ele) => {
    // Get instagram-id
    const instagramId = ele.dataset.instagramId;

    fetch(`https://www.instagram.com/p/${instagramId}/?__a=1`)
      .then((response) => {
        response.json().then((json) => {
          // Get Original image from the json
          const level1 = json.graphql.shortcode_media;

          let divHTML = `<div
                          class="elegant-gallery"
                          itemscope
                          itemtype="http://schema.org/ImageGallery"
                        >`;

          const username = level1.owner.username;
          const name = level1.owner.full_name;

          if (
            level1.edge_sidecar_to_children &&
            level1.edge_sidecar_to_children.edges.length > 0
          ) {
            // It is more than one image
            level1.edge_sidecar_to_children.edges.forEach((edge) => {
              const origImage = edge.node.display_url;
              const height = edge.node.dimensions.height;
              const width = edge.node.dimensions.width;
              const thumbnail = edge.node.display_resources[0].src;

              divHTML += getFigureHTML(
                origImage,
                height,
                width,
                thumbnail,
                username,
                name,
                instagramId
              );
            });
          } else {
            const origImage = level1.display_url;
            const height = level1.dimensions.height;
            const width = level1.dimensions.width;
            const thumbnail = level1.display_resources[0].src;

            divHTML += getFigureHTML(
              origImage,
              height,
              width,
              thumbnail,
              username,
              name,
              instagramId
            );
          }

          // Close div
          divHTML += `</div>`;

          // Replace ele with the div
          ele.innerHTML = divHTML;
          ele.replaceWith(ele.children[0]);

          // Trigger PhotoSwipe
          initPhotoSwipeFromDOM(".elegant-gallery");
        });
      })
      .catch((err) => console.error("Failed", err));
  });
};

convertInstagramToPhotoSwipe();
