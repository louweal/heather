<template>
  <div class="map-container">
    <div id="map" ref="map" class="map ml-md-1"></div>

    <div
      :class="markerInfo.show ? 'map-info--active' : false"
      class="card shadow-sm map-info position-absolute start-50 translate-middle-x top-0"
      style="z-index: 5; margin-top: 100px"
    >
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center">
          <nuxt-link :to="'/app/detail/' + markerInfo.id">
            <h3 class="mb-0 fs-5">{{ markerInfo.title }}</h3>
          </nuxt-link>

          <button class="bg-light rounded rounded-circle p-1 lh-1" @click="hideInfo()">
            <i class="bi bi-x"></i>
          </button>
        </div>

        <p v-if="markerInfo.available">
          To {{ markerInfo.type }}

          <span v-if="markerInfo.type === 'rent' && markerInfo.rent" class="opacity-50">€{{ markerInfo.rent.start }}</span>
        </p>
        <p v-else>Not available</p>
      </div>
      <div class="card-footer">
        <div class="d-flex gap-2 align-items-center">
          <button
            class="bg-light p-2 rounded-circle lh-1 text-white"
            @click="$store.commit('modals/show', { name: 'request', data: markerInfo })"
          >
            <i class="bi bi-chat-text-fill"></i>
          </button>
          <div>{{ markerInfo.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      markerInfo: { show: false },
      gmapmarkers: [],
    };
  },

  mounted() {
    this.initMap();
  },

  props: {
    zoom: {
      type: Number,
      default: 16,
    },
    results: {
      type: [Array, Object],
      default: () => {},
    },
  },

  watch: {
    zoom: function (val) {
      this.$map.setZoom(val);
    },
    results: {
      deep: true,
      handler(n, o) {
        const objectsEqual = (o1, o2) => Object.keys(o1).length === Object.keys(o2).length && Object.keys(o1).every((p) => o1[p] === o2[p]);
        if (!objectsEqual(o, n)) {
          // remove the old markers
          for (let i = 0; i < this.gmapmarkers.length; i++) {
            this.gmapmarkers[i].setMap(null);
          }
          this.gmapmarkers = [];
          this.setMarkers(n); // place new markers
        }
      },
    },
  },

  computed: {},

  methods: {
    hideInfo() {
      this.markerInfo.show = false;
    },

    getCenter() {
      if (this.$store.state.search.place) {
        let place = this.$store.state.search.place;
        return { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
      }
      return this.$store.state.defaultLoc;
    },

    async initMap() {
      console.log("initmap");

      //@ts-ignore
      const { Map } = await google.maps.importLibrary("maps");

      this.$map = new Map(this.$refs["map"], {
        zoom: this.zoom,
        center: this.getCenter(),
        mapId: "f7886dcdb440711",
        disableDefaultUI: true,
      });

      this.setMarkers(this.results);

      // google.maps.event.addListener(this.$map, "click", function (event) {
      //   this.markerInfo.show = false; // hides marker info when clicking on map
      // });
    },

    setMarkers(markers) {
      const iconBase = "https://heather.codesparks.nl/";
      const pins = {
        primary: iconBase + "pin-primary.svg",
        secondary: iconBase + "pin-secondary.svg",
        grey: iconBase + "pin-grey.svg",
      };
      // copy all results to markers

      for (let i = 0; i < markers.length; i++) {
        let m = markers[i];

        const marker = new google.maps.Marker({
          map: this.$map,
          position: m.location,
          title: m.title,
          icon: m.available ? pins.primary : pins.grey,
        });

        this.gmapmarkers.push(marker);

        google.maps.event.addListener(
          marker,
          "click",
          ((marker) => {
            return () => {
              this.setCurrentMarker(m); // sets data in info box
              this.$map.panTo(marker.getPosition());
            };
          })(marker)
        );
      }

      console.log("Num markers:" + this.gmapmarkers.length);
    },

    setCurrentMarker(m) {
      // sets data in info box
      this.markerInfo = { show: false };
      this.markerInfo["available"] = m.available;
      this.markerInfo["title"] = m.title;
      this.markerInfo["type"] = m.type;
      this.markerInfo["visual"] = m.visuals[0];
      if (m.type === "rent") {
        this.markerInfo["rent"] = m.rent;
      }
      this.markerInfo["name"] = m.name;
      this.markerInfo["id"] = m.id;
      this.markerInfo.show = true;
    },
  },
};
</script>

<style lang="scss">
.map-container {
  z-index: 3;
  position: relative;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  min-height: 100vh;
  width: 100vw;

  @include media-breakpoint-up(md) {
    left: auto;
    top: 0;
    right: 0;
    min-height: 100vh;
    width: 50vw;
  }
}

.map {
  min-height: 100vh;

  // @include media-breakpoint-up(md) {
  //   margin-left: 1.6rem;
  // }

  &-info {
    opacity: 0;
    transition: opacity 0.3s cubic-bezier(0.2, 0, 0.2, 1);
    min-width: 270px;
    min-height: 100px;

    &--active {
      opacity: 1 !important;
    }
  }
}

.info-window {
  min-width: 270px;
  min-height: 200px;
}
</style>
