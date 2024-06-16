document.addEventListener("DOMContentLoaded", () => {
  const m3u8FileUrl = 'https://i.mjh.nz/SamsungTVPlus/us.m3u8'; // Replace with your .m3u8 file URL

  // Fetch the .m3u8 file
  fetch(m3u8FileUrl)
    .then(response => response.text())
    .then(data => {
      // Parse .m3u8 file content
      const lines = data.split('\n');
      const mediaUrls = [];
      let image = '';
      let title = '';
      
      lines.forEach(line => {
        if (line.startsWith('#EXTINF')) {
          // Example extract for an image or title from EXTINF if exists
          const info = line.split(',');
          const imageUrl = info[0].split(" ");
          const title = info[1];
          if (imageUrlMatch) {
            currentImageUrl = title;
          }
          if (info[0].contains("tvg-logo")) {
            const logo = imageUrl.substring('tvg-logo=\"'.length()).replace('\"','');
            image = logo;
          }
        } else if (line.startsWith('http') || line.endsWith('.m3u8')) {
          // Assume line containing HTTP URL has the media URL
          mediaUrls.push({ url: line.trim(), image: image.trim() title: title.trim()});
          currentImageUrl = ''; // Reset after each media URL
        }
      });

      // Add channels to HTML
      const container = document.getElementById('channels-container');
      mediaUrls.forEach(channel => {
        const channelElement = document.createElement('div');
        const imageElement = document.createElement('img');
        const linkElement = document.createElement('a');

        if (channel.image) {
          imageElement.src = channel.image;
          channelElement.appendChild(imageElement);
        }

        linkElement.href = channel.url;
        linkElement.textContent = channel.url;
        channelElement.appendChild(linkElement);

        container.appendChild(channelElement);
      });
    })
    .catch(error => console.error('Error fetching .m3u8 file:', error));
});