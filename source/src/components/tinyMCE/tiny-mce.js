export function initTinyMCE(data) {
  tinymce.init({
    selector: '#tinyMCE-content',
    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
    tinycomments_mode: 'embedded',
    tinycomments_author: 'Author name',
    mergetags_list: [
      { value: 'First.Name', title: 'First Name' },
      { value: 'Email', title: 'Email' },
    ],
  }).then(() => {
    if (data) tinymce.activeEditor.setContent(data);
  });
}

export function initNonEditableTinyMCE(selector, data) {
  // activate tinyMCE
  tinymce.init({
    selector,
    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
    tinycomments_mode: 'embedded',
    tinycomments_author: 'Author name',
    mergetags_list: [
      { value: 'First.Name', title: 'First Name' },
      { value: 'Email', title: 'Email' },
    ],
    readonly: true,
    toolbar: false,
    menubar: false,
  }).then(() => {
    tinymce.activeEditor.setContent(data);
  });
}

export function setTinyMCEData(data) {
  return tinymce.activeEditor.setContent(data);
}

export function getTinyMCEData() {
  return tinymce.activeEditor.getContent();
}
