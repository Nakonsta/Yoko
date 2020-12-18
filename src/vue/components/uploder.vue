<template>
  <div class="uploader" :class="{'error': isNotFiles}">
    <div v-show="!files.length && !$attrs.value.length">
      <slot></slot>
      <div
          class="uploader__file"
          @dragover="hightlight"
          @dragenter="hightlight"
          @hightleave="unhightlight"
          @dragend="unhightlight"
          @drop="drop"
      >
        <svg width="25" height="24" viewBox="0 0 25 24" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M12.9567 11.29C12.8598 11.199 12.7454 11.1276 12.6203 11.08C12.3721 10.98 12.0938 10.98 11.8456 11.08C11.7205 11.1276 11.6062 11.199 11.5092 11.29L9.47051 13.29C9.27856 13.4783 9.17073 13.7337 9.17073 14C9.17073 14.2663 9.27856 14.5217 9.47051 14.71C9.66246 14.8983 9.9228 15.0041 10.1943 15.0041C10.4657 15.0041 10.726 14.8983 10.918 14.71L11.2136 14.41V17C11.2136 17.2652 11.321 17.5196 11.5122 17.7071C11.7033 17.8946 11.9626 18 12.233 18C12.5033 18 12.7626 17.8946 12.9538 17.7071C13.1449 17.5196 13.2523 17.2652 13.2523 17V14.41L13.5479 14.71C13.6427 14.8037 13.7554 14.8781 13.8797 14.9289C14.0039 14.9797 14.1371 15.0058 14.2717 15.0058C14.4062 15.0058 14.5395 14.9797 14.6637 14.9289C14.7879 14.8781 14.9007 14.8037 14.9954 14.71C15.091 14.617 15.1668 14.5064 15.2185 14.3846C15.2703 14.2627 15.2969 14.132 15.2969 14C15.2969 13.868 15.2703 13.7373 15.2185 13.6154C15.1668 13.4936 15.091 13.383 14.9954 13.29L12.9567 11.29ZM20.3878 8.94C20.3772 8.84813 20.3567 8.75763 20.3266 8.67V8.58C20.2776 8.47718 20.2123 8.38267 20.133 8.3L14.0168 2.3C13.9326 2.22222 13.8362 2.15808 13.7314 2.11H13.6295C13.5304 2.058 13.4238 2.02092 13.3135 2H7.13619C6.32514 2 5.54731 2.31607 4.97381 2.87868C4.40031 3.44129 4.07813 4.20435 4.07812 5V19C4.07812 19.7956 4.40031 20.5587 4.97381 21.1213C5.54731 21.6839 6.32514 22 7.13619 22H17.3297C18.1408 22 18.9186 21.6839 19.4921 21.1213C20.0656 20.5587 20.3878 19.7956 20.3878 19V9C20.3878 9 20.3878 9 20.3878 8.94ZM14.2717 5.41L16.9118 8H15.291C15.0207 8 14.7614 7.89464 14.5702 7.70711C14.3791 7.51957 14.2717 7.26522 14.2717 7V5.41ZM18.3491 19C18.3491 19.2652 18.2417 19.5196 18.0505 19.7071C17.8594 19.8946 17.6001 20 17.3297 20H7.13619C6.86584 20 6.60656 19.8946 6.4154 19.7071C6.22423 19.5196 6.11683 19.2652 6.11683 19V5C6.11683 4.73478 6.22423 4.48043 6.4154 4.29289C6.60656 4.10536 6.86584 4 7.13619 4H12.233V7C12.233 7.79565 12.5552 8.55871 13.1286 9.12132C13.7021 9.68393 14.48 10 15.291 10H18.3491V19Z"/>
        </svg>
        <div class="uploader__file-title">Перетащите файл в область {{ extensions }}</div>
        <div class="uploader__file-or">или</div>
        <label class="uploader__file-btn btn btn--bdr">
          Загрузите файл
            <input
                    type="file"
                    :name="name"
                    :accept="extensions.length ? extensions : null"
                    @change="change($event)"
                    :multiple="max > 1 ? 'multiple' : null"
                    :required="required"
            />
        </label>
        <div class="uploader__file-extensions" v-show="extensions.length">{{ extensions }}</div>
      </div>
    </div>
    <div class="uploader__preview" v-if="preview && files.length">
      <div class="uploader__preview-file" v-for="(item, index) in files" :key="index">
        <img :src="item.data" v-if="item.isImage" alt=""/>
        <span v-if="!item.isImage">.{{ item.extension }}</span>
        <a href="javascript:{}" v-if="!disabled" @click="previewCancel(item, index)" class="uploader__preview-cancel">
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M13.4099 12.0001L17.7099 7.71006C17.8982 7.52176 18.004 7.26637 18.004 7.00006C18.004 6.73376 17.8982 6.47837 17.7099 6.29006C17.5216 6.10176 17.2662 5.99597 16.9999 5.99597C16.7336 5.99597 16.4782 6.10176 16.2899 6.29006L11.9999 10.5901L7.70994 6.29006C7.52164 6.10176 7.26624 5.99597 6.99994 5.99597C6.73364 5.99597 6.47824 6.10176 6.28994 6.29006C6.10164 6.47837 5.99585 6.73376 5.99585 7.00006C5.99585 7.26637 6.10164 7.52176 6.28994 7.71006L10.5899 12.0001L6.28994 16.2901C6.19621 16.383 6.12182 16.4936 6.07105 16.6155C6.02028 16.7373 5.99414 16.8681 5.99414 17.0001C5.99414 17.1321 6.02028 17.2628 6.07105 17.3846C6.12182 17.5065 6.19621 17.6171 6.28994 17.7101C6.3829 17.8038 6.4935 17.8782 6.61536 17.929C6.73722 17.9797 6.86793 18.0059 6.99994 18.0059C7.13195 18.0059 7.26266 17.9797 7.38452 17.929C7.50638 17.8782 7.61698 17.8038 7.70994 17.7101L11.9999 13.4101L16.2899 17.7101C16.3829 17.8038 16.4935 17.8782 16.6154 17.929C16.7372 17.9797 16.8679 18.0059 16.9999 18.0059C17.132 18.0059 17.2627 17.9797 17.3845 17.929C17.5064 17.8782 17.617 17.8038 17.7099 17.7101C17.8037 17.6171 17.8781 17.5065 17.9288 17.3846C17.9796 17.2628 18.0057 17.1321 18.0057 17.0001C18.0057 16.8681 17.9796 16.7373 17.9288 16.6155C17.8781 16.4936 17.8037 16.383 17.7099 16.2901L13.4099 12.0001Z"/>
          </svg>
        </a>
      </div>
    </div>
    <div class="uploader__process" v-if="submit && files.length">
      <div class="uploader__process-file" v-for="(item, index) in files">
        <div class="uploader__process-progress">
          <svg class="uploader__process-icon" width="24" height="24" viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg">
            <path
                d="M20 8.94C19.9896 8.84813 19.9695 8.75763 19.94 8.67V8.58C19.8919 8.47718 19.8278 8.38267 19.75 8.3L13.75 2.3C13.6673 2.22222 13.5728 2.15808 13.47 2.11H13.38L13.06 2H7C6.20435 2 5.44129 2.31607 4.87868 2.87868C4.31607 3.44129 4 4.20435 4 5V19C4 19.7956 4.31607 20.5587 4.87868 21.1213C5.44129 21.6839 6.20435 22 7 22H17C17.7956 22 18.5587 21.6839 19.1213 21.1213C19.6839 20.5587 20 19.7956 20 19V9C20 9 20 9 20 8.94ZM14 5.41L16.59 8H14V5.41ZM18 19C18 19.2652 17.8946 19.5196 17.7071 19.7071C17.5196 19.8946 17.2652 20 17 20H7C6.73478 20 6.48043 19.8946 6.29289 19.7071C6.10536 19.5196 6 19.2652 6 19V5C6 4.73478 6.10536 4.48043 6.29289 4.29289C6.48043 4.10536 6.73478 4 7 4H12V9C12 9.26522 12.1054 9.51957 12.2929 9.70711C12.4804 9.89464 12.7348 10 13 10H18V19Z"/>
          </svg>
          <div class="uploader__process-title" v-html="item.file.name"></div>
        </div>
        <div class="uploader__process-progress active" :style="{width: item.percent+'%'}">
          <svg class="uploader__process-icon" width="24" height="24" viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg">
            <path
                d="M20 8.94C19.9896 8.84813 19.9695 8.75763 19.94 8.67V8.58C19.8919 8.47718 19.8278 8.38267 19.75 8.3L13.75 2.3C13.6673 2.22222 13.5728 2.15808 13.47 2.11H13.38L13.06 2H7C6.20435 2 5.44129 2.31607 4.87868 2.87868C4.31607 3.44129 4 4.20435 4 5V19C4 19.7956 4.31607 20.5587 4.87868 21.1213C5.44129 21.6839 6.20435 22 7 22H17C17.7956 22 18.5587 21.6839 19.1213 21.1213C19.6839 20.5587 20 19.7956 20 19V9C20 9 20 9 20 8.94ZM14 5.41L16.59 8H14V5.41ZM18 19C18 19.2652 17.8946 19.5196 17.7071 19.7071C17.5196 19.8946 17.2652 20 17 20H7C6.73478 20 6.48043 19.8946 6.29289 19.7071C6.10536 19.5196 6 19.2652 6 19V5C6 4.73478 6.10536 4.48043 6.29289 4.29289C6.48043 4.10536 6.73478 4 7 4H12V9C12 9.26522 12.1054 9.51957 12.2929 9.70711C12.4804 9.89464 12.7348 10 13 10H18V19Z"/>
          </svg>
          <div class="uploader__process-title" v-html="item.file.name"></div>
        </div>
        <a href="javascript:{}" v-if="!disabled" @click="uploadCancel(item, index)" class="uploader__process-cancel">
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M13.4099 12.0001L17.7099 7.71006C17.8982 7.52176 18.004 7.26637 18.004 7.00006C18.004 6.73376 17.8982 6.47837 17.7099 6.29006C17.5216 6.10176 17.2662 5.99597 16.9999 5.99597C16.7336 5.99597 16.4782 6.10176 16.2899 6.29006L11.9999 10.5901L7.70994 6.29006C7.52164 6.10176 7.26624 5.99597 6.99994 5.99597C6.73364 5.99597 6.47824 6.10176 6.28994 6.29006C6.10164 6.47837 5.99585 6.73376 5.99585 7.00006C5.99585 7.26637 6.10164 7.52176 6.28994 7.71006L10.5899 12.0001L6.28994 16.2901C6.19621 16.383 6.12182 16.4936 6.07105 16.6155C6.02028 16.7373 5.99414 16.8681 5.99414 17.0001C5.99414 17.1321 6.02028 17.2628 6.07105 17.3846C6.12182 17.5065 6.19621 17.6171 6.28994 17.7101C6.3829 17.8038 6.4935 17.8782 6.61536 17.929C6.73722 17.9797 6.86793 18.0059 6.99994 18.0059C7.13195 18.0059 7.26266 17.9797 7.38452 17.929C7.50638 17.8782 7.61698 17.8038 7.70994 17.7101L11.9999 13.4101L16.2899 17.7101C16.3829 17.8038 16.4935 17.8782 16.6154 17.929C16.7372 17.9797 16.8679 18.0059 16.9999 18.0059C17.132 18.0059 17.2627 17.9797 17.3845 17.929C17.5064 17.8782 17.617 17.8038 17.7099 17.7101C17.8037 17.6171 17.8781 17.5065 17.9288 17.3846C17.9796 17.2628 18.0057 17.1321 18.0057 17.0001C18.0057 16.8681 17.9796 16.7373 17.9288 16.6155C17.8781 16.4936 17.8037 16.383 17.7099 16.2901L13.4099 12.0001Z"/>
          </svg>
        </a>
        <a href="javascript:{}" class="uploader__process-ok" v-show="item.uploaded">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.33398 16.4211L14.3404 21.3333L23.8525 12" stroke="white" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
      <button class="btn btn--bdr" type="button" disabled="disabled">Отправить</button>
    </div>
    <div class="uploader__process" v-if="!submit && !preview && files.length">
      <div class="uploader__process-file" v-for="(item, index) in files">
        <div class="uploader__process-progress">
          <svg class="uploader__process-icon" width="24" height="24" viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg">
            <path
                d="M20 8.94C19.9896 8.84813 19.9695 8.75763 19.94 8.67V8.58C19.8919 8.47718 19.8278 8.38267 19.75 8.3L13.75 2.3C13.6673 2.22222 13.5728 2.15808 13.47 2.11H13.38L13.06 2H7C6.20435 2 5.44129 2.31607 4.87868 2.87868C4.31607 3.44129 4 4.20435 4 5V19C4 19.7956 4.31607 20.5587 4.87868 21.1213C5.44129 21.6839 6.20435 22 7 22H17C17.7956 22 18.5587 21.6839 19.1213 21.1213C19.6839 20.5587 20 19.7956 20 19V9C20 9 20 9 20 8.94ZM14 5.41L16.59 8H14V5.41ZM18 19C18 19.2652 17.8946 19.5196 17.7071 19.7071C17.5196 19.8946 17.2652 20 17 20H7C6.73478 20 6.48043 19.8946 6.29289 19.7071C6.10536 19.5196 6 19.2652 6 19V5C6 4.73478 6.10536 4.48043 6.29289 4.29289C6.48043 4.10536 6.73478 4 7 4H12V9C12 9.26522 12.1054 9.51957 12.2929 9.70711C12.4804 9.89464 12.7348 10 13 10H18V19Z"/>
          </svg>
          <div class="uploader__process-title" v-html="item.file.name"></div>
        </div>
        <div class="uploader__process-progress active" :style="{width: '100%'}">
          <svg class="uploader__process-icon" width="24" height="24" viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg">
            <path
                d="M20 8.94C19.9896 8.84813 19.9695 8.75763 19.94 8.67V8.58C19.8919 8.47718 19.8278 8.38267 19.75 8.3L13.75 2.3C13.6673 2.22222 13.5728 2.15808 13.47 2.11H13.38L13.06 2H7C6.20435 2 5.44129 2.31607 4.87868 2.87868C4.31607 3.44129 4 4.20435 4 5V19C4 19.7956 4.31607 20.5587 4.87868 21.1213C5.44129 21.6839 6.20435 22 7 22H17C17.7956 22 18.5587 21.6839 19.1213 21.1213C19.6839 20.5587 20 19.7956 20 19V9C20 9 20 9 20 8.94ZM14 5.41L16.59 8H14V5.41ZM18 19C18 19.2652 17.8946 19.5196 17.7071 19.7071C17.5196 19.8946 17.2652 20 17 20H7C6.73478 20 6.48043 19.8946 6.29289 19.7071C6.10536 19.5196 6 19.2652 6 19V5C6 4.73478 6.10536 4.48043 6.29289 4.29289C6.48043 4.10536 6.73478 4 7 4H12V9C12 9.26522 12.1054 9.51957 12.2929 9.70711C12.4804 9.89464 12.7348 10 13 10H18V19Z"/>
          </svg>
          <div class="uploader__process-title" v-html="item.file.name"></div>
        </div>
        <a href="javascript:{}" v-if="!disabled" @click="uploadCancel(item, index)" class="uploader__process-cancel">
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M13.4099 12.0001L17.7099 7.71006C17.8982 7.52176 18.004 7.26637 18.004 7.00006C18.004 6.73376 17.8982 6.47837 17.7099 6.29006C17.5216 6.10176 17.2662 5.99597 16.9999 5.99597C16.7336 5.99597 16.4782 6.10176 16.2899 6.29006L11.9999 10.5901L7.70994 6.29006C7.52164 6.10176 7.26624 5.99597 6.99994 5.99597C6.73364 5.99597 6.47824 6.10176 6.28994 6.29006C6.10164 6.47837 5.99585 6.73376 5.99585 7.00006C5.99585 7.26637 6.10164 7.52176 6.28994 7.71006L10.5899 12.0001L6.28994 16.2901C6.19621 16.383 6.12182 16.4936 6.07105 16.6155C6.02028 16.7373 5.99414 16.8681 5.99414 17.0001C5.99414 17.1321 6.02028 17.2628 6.07105 17.3846C6.12182 17.5065 6.19621 17.6171 6.28994 17.7101C6.3829 17.8038 6.4935 17.8782 6.61536 17.929C6.73722 17.9797 6.86793 18.0059 6.99994 18.0059C7.13195 18.0059 7.26266 17.9797 7.38452 17.929C7.50638 17.8782 7.61698 17.8038 7.70994 17.7101L11.9999 13.4101L16.2899 17.7101C16.3829 17.8038 16.4935 17.8782 16.6154 17.929C16.7372 17.9797 16.8679 18.0059 16.9999 18.0059C17.132 18.0059 17.2627 17.9797 17.3845 17.929C17.5064 17.8782 17.617 17.8038 17.7099 17.7101C17.8037 17.6171 17.8781 17.5065 17.9288 17.3846C17.9796 17.2628 18.0057 17.1321 18.0057 17.0001C18.0057 16.8681 17.9796 16.7373 17.9288 16.6155C17.8781 16.4936 17.8037 16.383 17.7099 16.2901L13.4099 12.0001Z"/>
          </svg>
        </a>
        <a href="javascript:{}" class="uploader__process-ok" v-show="item.uploaded">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.33398 16.4211L14.3404 21.3333L23.8525 12" stroke="white" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    </div>
    <div class="uploader__process" v-if="!files.length && $attrs.value.length">
      <div class="uploader__process-file" v-for="(item, index) in $attrs.value">
        <div class="uploader__process-progress">
          <svg class="uploader__process-icon" width="24" height="24" viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg">
            <path
                d="M20 8.94C19.9896 8.84813 19.9695 8.75763 19.94 8.67V8.58C19.8919 8.47718 19.8278 8.38267 19.75 8.3L13.75 2.3C13.6673 2.22222 13.5728 2.15808 13.47 2.11H13.38L13.06 2H7C6.20435 2 5.44129 2.31607 4.87868 2.87868C4.31607 3.44129 4 4.20435 4 5V19C4 19.7956 4.31607 20.5587 4.87868 21.1213C5.44129 21.6839 6.20435 22 7 22H17C17.7956 22 18.5587 21.6839 19.1213 21.1213C19.6839 20.5587 20 19.7956 20 19V9C20 9 20 9 20 8.94ZM14 5.41L16.59 8H14V5.41ZM18 19C18 19.2652 17.8946 19.5196 17.7071 19.7071C17.5196 19.8946 17.2652 20 17 20H7C6.73478 20 6.48043 19.8946 6.29289 19.7071C6.10536 19.5196 6 19.2652 6 19V5C6 4.73478 6.10536 4.48043 6.29289 4.29289C6.48043 4.10536 6.73478 4 7 4H12V9C12 9.26522 12.1054 9.51957 12.2929 9.70711C12.4804 9.89464 12.7348 10 13 10H18V19Z"/>
          </svg>
          <div class="uploader__process-title" v-html="item.name"></div>
        </div>
        <div class="uploader__process-progress active" :style="{width: '100%'}">
          <svg class="uploader__process-icon" width="24" height="24" viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg">
            <path
                d="M20 8.94C19.9896 8.84813 19.9695 8.75763 19.94 8.67V8.58C19.8919 8.47718 19.8278 8.38267 19.75 8.3L13.75 2.3C13.6673 2.22222 13.5728 2.15808 13.47 2.11H13.38L13.06 2H7C6.20435 2 5.44129 2.31607 4.87868 2.87868C4.31607 3.44129 4 4.20435 4 5V19C4 19.7956 4.31607 20.5587 4.87868 21.1213C5.44129 21.6839 6.20435 22 7 22H17C17.7956 22 18.5587 21.6839 19.1213 21.1213C19.6839 20.5587 20 19.7956 20 19V9C20 9 20 9 20 8.94ZM14 5.41L16.59 8H14V5.41ZM18 19C18 19.2652 17.8946 19.5196 17.7071 19.7071C17.5196 19.8946 17.2652 20 17 20H7C6.73478 20 6.48043 19.8946 6.29289 19.7071C6.10536 19.5196 6 19.2652 6 19V5C6 4.73478 6.10536 4.48043 6.29289 4.29289C6.48043 4.10536 6.73478 4 7 4H12V9C12 9.26522 12.1054 9.51957 12.2929 9.70711C12.4804 9.89464 12.7348 10 13 10H18V19Z"/>
          </svg>
          <div class="uploader__process-title" v-html="item.name"></div>
        </div>
        <a href="javascript:{}" v-if="!disabled" @click="uploadCancel(item, index, true)" class="uploader__process-cancel">
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M13.4099 12.0001L17.7099 7.71006C17.8982 7.52176 18.004 7.26637 18.004 7.00006C18.004 6.73376 17.8982 6.47837 17.7099 6.29006C17.5216 6.10176 17.2662 5.99597 16.9999 5.99597C16.7336 5.99597 16.4782 6.10176 16.2899 6.29006L11.9999 10.5901L7.70994 6.29006C7.52164 6.10176 7.26624 5.99597 6.99994 5.99597C6.73364 5.99597 6.47824 6.10176 6.28994 6.29006C6.10164 6.47837 5.99585 6.73376 5.99585 7.00006C5.99585 7.26637 6.10164 7.52176 6.28994 7.71006L10.5899 12.0001L6.28994 16.2901C6.19621 16.383 6.12182 16.4936 6.07105 16.6155C6.02028 16.7373 5.99414 16.8681 5.99414 17.0001C5.99414 17.1321 6.02028 17.2628 6.07105 17.3846C6.12182 17.5065 6.19621 17.6171 6.28994 17.7101C6.3829 17.8038 6.4935 17.8782 6.61536 17.929C6.73722 17.9797 6.86793 18.0059 6.99994 18.0059C7.13195 18.0059 7.26266 17.9797 7.38452 17.929C7.50638 17.8782 7.61698 17.8038 7.70994 17.7101L11.9999 13.4101L16.2899 17.7101C16.3829 17.8038 16.4935 17.8782 16.6154 17.929C16.7372 17.9797 16.8679 18.0059 16.9999 18.0059C17.132 18.0059 17.2627 17.9797 17.3845 17.929C17.5064 17.8782 17.617 17.8038 17.7099 17.7101C17.8037 17.6171 17.8781 17.5065 17.9288 17.3846C17.9796 17.2628 18.0057 17.1321 18.0057 17.0001C18.0057 16.8681 17.9796 16.7373 17.9288 16.6155C17.8781 16.4936 17.8037 16.383 17.7099 16.2901L13.4099 12.0001Z"/>
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../helpers/api';
// let pdfjsLib = require('pdfjs-dist/build/pdf');

export default {
  $_veeValidate: {
    value() {
      return this.files.length > 0;
    },
    name() {
      return this.name;
    }
  },
  name: 'Uploader',
  mixins: [api],
  props: {
    disabled: {
      default: false,
      type: Boolean
    },
    isNotFiles: {
      default: false,
      type: Boolean
    },
    name: {
      default: 'uploader',
      type: String
    },
    // value: {
    //     default: '',
    //     type: String,
    // },
    max: {
      default: 1,
      type: [Number, Boolean]
    },
    required: {
      default: false,
      type: Boolean
    },
    extensions: {
      default: '',
      type: String
    },
    metatypes: {
      default: () => ([]),
      type: Array
    },
    submit: {
      default: false,
      type: Boolean
    },
    preview: {
      default: false,
      type: Boolean
    }
  },
  data: function () {
    return {
      accept: '',
      metatype: [],
      files: [],
      process: false
    }
  },
  created() {
    let exts = [],
        // types = JSON.parse(this.type) || null,
        types = this.type || null;
    if (types) {
      for (let ext in types) {
        if (!types.hasOwnProperty(ext)) continue;
        exts.push('.' + ext);
        this.metatype.push(types[ext]);
      }
      this.accept = '(' + exts.join(', ') + ')';
    }
  },
  watch: {
    type: {
      handler: function (newType, oldType) {
        let exts = [],
            // types = JSON.parse(newType);
            types = newType || null;
        if (types) {
          for (let ext in types) {
            if (!types.hasOwnProperty(ext)) continue;
            exts.push('.' + ext);
            this.metatype.push(types[ext]);
          }
          this.accept = '(' + exts.join(', ') + ')';
        }
      }
    }
  },
  methods: {
    hightlight: function (evt) {
      evt.preventDefault();
      evt.stopPropagation();
      this.$el.querySelector('.uploader__file').classList.add('hover');
    },
    unhightlight: function (evt) {
      evt.preventDefault();
      evt.stopPropagation();
      this.$el.querySelector('.uploader__file').classList.remove('hover');
    },
    drop: function (evt) {
      evt.preventDefault();
      evt.stopPropagation();
      this.$el.querySelector('.uploader__file').classList.remove('hover');
      let self = this;
      self.files = [];
      Array.prototype.forEach.call(evt.dataTransfer.files, function (file) {
        if (!self.metatypes.length || self.metatypes.indexOf(file.type) !== -1) {
          self.addFile(file);
        }
      });
      this.files.splice(this.max);
      let files = this.files.map((item)=>{return item.file});
      this.$emit('input', this.files.length ? ( this.max === 1 ? files[0] : files ) : null);
      if (this.submit) this.uploadFiles();
      else if (this.preview) this.previewFiles();
    },
    change: function (evt) {
      let self = this;
      self.files = [];
      Array.prototype.forEach.call(evt.target.files, function (file) {
        if (!self.metatypes.length || self.metatypes.indexOf(file.type) !== -1) {
          self.addFile(file);
        }
      });
      this.files.splice(this.max);
      evt.target.value = '';
      let files = this.files.map((item)=>{return item.file});
      this.$emit('input', this.files.length ? ( this.max === 1 ? files[0] : files ) : null);
      if (this.submit) this.uploadFiles();
      else if (this.preview) this.previewFiles();
    },
    addFile: function (file) {
      let item = {
        file: file,
        percent: 0,
        uploaded: false,
        data: null,
        extension: file.name.substr(file.name.lastIndexOf('.') + 1),
        // isPDF: file.type === 'application/pdf',
        isImage: ['image/png', 'image/jpeg', 'image/bmp', 'image/tiff', 'image/gif', 'image/webp'].indexOf(file.type) !== -1,
      };
      this.files.push(item);
    },
    uploadFiles: function () {
      this.files.forEach((item) => {
        let formDataObj = new FormData(),
            name = this.name;
        formDataObj.append(name, item.file);
        item.percent = 25; // todo удалить!
        item.token = axios.CancelToken.source();
        let axiosConfig = {
          cancelToken: item.token.token,
          onUploadProgress: function (evt) {
            item.percent = Math.round((evt.loaded * 100) / evt.total);
          },
        };
        this.fetchCatalogImport(formDataObj, axiosConfig)
            .then(() => {
              // todo Файл загружен
              item.percent = 100;
              item.uploaded = true;
            })
            .catch((response) => {
              console.log(response.message);
              window.notificationError('Ошибка сервера')
            });
      });
    },
    uploadCancel: function (item, index, model) {
      if (!model) {
        // item.token.cancel();
        this.files.splice(index, 1);
      } else {
        this.$attrs.value.splice(index, 1);
      }
      this.$emit('input', this.files.length ? true : '');
    },
    previewFiles: function () {
      let reader = null;
      this.files.forEach((item) => {
        switch (item.file.type) {
            // case 'application/pdf':
            //     // todo pdf preview
            //     reader = new FileReader();
            //     reader.onload = () => {
            //         console.log(this.result);
            //         let pdfData = new Uint8Array(this.result);
            //         pdfjsLib.getDocument(pdfData).promise().then(function(pdf) {
            //             pdf.getPage(1).then(page => {
            //
            //             });
            //         });
            //     };
            //     reader.readAsArrayBuffer(item.file);
            //     break;
          case 'image/png':
          case 'image/jpeg':
          case 'image/bmp':
          case 'image/tiff':
          case 'image/gif':
          case 'image/webp':
            reader = new FileReader();
            reader.onload = (evt) => {
              item.data = evt.target.result;
            };
            reader.readAsDataURL(item.file);
            break;
          default:
            // item.extension = item.file.name.substr(item.file.name.lastIndexOf('.') + 1);
            break;
        }
      });
    },
    previewCancel: function (item, index) {
      this.files.splice(index, 1);
      this.$emit('input', this.files.length ? true : '');
    },
  }
}
</script>

<style lang="scss">
@import "../../assets/sass/variables/variables";
@import "../../assets/sass/variables/fluid-variables";
@import "../../assets/sass/mixins/fluid-mixin";
@import "../../assets/sass/mixins/mq";

.uploader {
  p {
    margin: 0 0 rem(24px);
    font-size: rem(16px);

    a {
      font-weight: 500;
      text-decoration: underline;
      color: $colorTurquoise;

      &:hover {
        text-decoration: none;
        color: $colorTurquoiseHover;
      }
    }
  }

  &__file {
    border: 1px dashed #cdcdcd;
    border-radius: 8px;
    padding: rem(40px);
    font-weight: 500;
    text-align: center;
    background: #ffffff;
    position: relative;
    transition: background $animation;

    @include mq($until: tablet) {
      padding: rem(87px) rem(40px);
    }

    &.hover {
      border-style: solid;
      background: #f3f3f3;
    }

    svg {
      display: block;
      margin: 0 auto rem(24px);
      width: 24px;
      height: 24px;
      fill: $colorTurquoise;
      @include mq($until: tablet) {
        display: none;
      }
    }

    &-title {
      font-size: rem(24px);
      @include mq($until: tablet) {
        display: none;
      }
    }

    &-or {
      margin-top: rem(16px);
      font-size: rem(14px);
      @include mq($until: tablet) {
        display: none;
      }
    }

    &-btn {
      display: block;
      margin: rem(24px) auto 0;
      max-width: 220px;
      @include mq($until: tablet) {
        margin: 0 auto;
      }
    }

    input {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
      opacity: 0;
    }

    &-extensions {
      margin: rem(24px) 0 0;
      font-size: rem(20px);

      @include mq($from: tablet) {
        display: none;
      }
    }
  }

  &__process {
    &-file {
      margin: 0 0 rem(32px);
      border-radius: 6px;
      position: relative;
      overflow: hidden;
    }

    &-progress {
      padding: rem(17px) 0;
      background: #f4f4f4;
      overflow: hidden;

      &.active {
        width: 0;
        padding-right: 0;
        background: $colorTurquoise;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        pointer-events: none;

        .uploader__process-icon {
          fill: $colorWhite
        }

        .uploader__process-title {
          color: $colorWhite;
          text-overflow: initial;
        }
      }

      .uploader__process-icon {
        left: 16px;
        fill: $colorGray;
      }

      .uploader__process-title {
        padding: 0 108px 0 56px;
        font-weight: 500;
        line-height: 22px;
        color: $colorGray;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        pointer-events: none;
      }
    }

    &-icon,
    &-cancel,
    &-ok {
      display: block;
      position: absolute;
      top: 50%;
    }

    &-icon,
    &-cancel {
      margin-top: -12px;
      width: 24px;
      height: 24px;
    }

    &-cancel {
      right: 16px;
      fill: $colorText;
      transition: fill $animation;
    }

    &-ok {
      display: none;
      margin-top: -16px;
      width: 32px;
      height: 32px;
      right: 60px;
    }
  }

  &__preview {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: rem(-20px);

    &-file {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: rem(20px);
      border: 1px solid #cdcdcd;
      border-radius: 6px;
      padding: rem(10px);
      width: rem(200px);
      height: rem(200px);
      position: relative;
      overflow: hidden;

      img {
        display: block;
        max-width: 100%;
        max-height: 100%;
      }

      span {
        text-transform: lowercase;
        font-weight: bold;
        font-size: rem(50px);
        pointer-events: none;
        color: #cdcdcd;
      }
    }

    &-cancel {
      display: block;
      width: 24px;
      height: 24px;
      background: $colorWhite;
      position: absolute;
      top: 0;
      right: 0;

      &:hover {
        svg {
          fill: $colorTurquoiseHover;
        }
      }

      svg {
        display: block;
        width: 24px;
        height: 24px;
        fill: $colorGray;
        transition: fill $animation;
      }
    }
  }

  &.error .uploader__file {
    color: $colorRed;
    border-color: $colorRed;
  }
}
</style>
