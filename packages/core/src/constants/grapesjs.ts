import type { EditorConfig, Plugin, PluginOptions } from "grapesjs";
import grapesjs from 'grapesjs';


type PluginToLoad = {
	id: string;
	src: string;
	options?: PluginOptions;
}

export const plugins: (Plugin | string | PluginToLoad)[] = [
  {
    id: 'gjs-blocks-basic',
    src: 'https://unpkg.com/grapesjs-blocks-basic'
  },
  'grapesjs-plugin-forms',
  'grapesjs-component-countdown'
];


export const defaultOptions: EditorConfig = {
  storageManager: false,
  assetManager: {
    assets: [
      'https://via.placeholder.com/350x250/78c5d6/fff',
      'https://via.placeholder.com/350x250/459ba8/fff',
      'https://via.placeholder.com/350x250/79c267/fff',
      'https://via.placeholder.com/350x250/c5d647/fff',
      'https://via.placeholder.com/350x250/f28c33/fff',
      'https://via.placeholder.com/350x250/e868a2/fff',
      'https://via.placeholder.com/350x250/cc4360/fff',
      'https://via.placeholder.com/350x250/78c5d6/eee',
      'https://via.placeholder.com/350x250/459ba8/eee',
      'https://via.placeholder.com/350x250/79c267/eee',
      'https://via.placeholder.com/350x250/c5d647/eee',
      'https://via.placeholder.com/350x250/f28c33/eee',
      'https://via.placeholder.com/350x250/e868a2/eee',
      'https://via.placeholder.com/350x250/cc4360/eee'
    ]
  },
  undoManager: {
    trackSelection: false
  },
  selectorManager: {
    componentFirst: true
  },
  components: `
        <div style="padding: 25px">Element A</div>
        <div class="example example-a">Element B</div>
        <div style="padding: 20px">
            <div class="example-b1">Element B1</div>
            <div class="example-b2">Element B2</div>
            <div>Element B3</div>

            <div 
              class="room-card" 
              data-room-id="1"
              data-room-name="Room 1"
              data-room-image="https://placehold.co/600x400"
              data-room-price="100"
              data-room-capacity="2"
              data-room-amenities="WiFi, Breakfast, Pool"
              data-room-rating="4.5"
              data-room-reviews="100"
              data-room-availability="Availablec"
            >
              <!-- Content will be inserted here -->
            </div>
        </div>
        <div>Element C</div>
    `
};
