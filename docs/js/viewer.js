let currentStoryData = null;

window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const storyId = params.get('id');

  const storyMeta = storyList.find(s => s.id === storyId);

  if (!storyMeta) {
    document.getElementById('viewer-content').textContent = 'エピソードが見つかりませんでした。';
    return;
  }

  document.title = "ダンジョンと畑のあいだで - " + storyMeta.title;
  document.getElementById('viewer-title').textContent = storyMeta.title;

  // 対応する個別ファイルを動的に生成して読み込む
  const script = document.createElement('script');
  script.src = `js/data/${storyMeta.fileId}.js`;
  
  script.onload = () => {
    if (currentStoryData && currentStoryData.content) {
      const contentDiv = document.getElementById('viewer-content');
      contentDiv.textContent = currentStoryData.content;
    } else {
      document.getElementById('viewer-content').textContent = '本文の読み込みに失敗しました。';
    }
  };

  script.onerror = () => {
    document.getElementById('viewer-content').textContent = 'ストーリーファイルの読み込みに失敗しました。';
  };

  document.body.appendChild(script);
});
