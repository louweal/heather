<template>
  <div class="map-container" :key="zoom">
    <div id="map" ref="map" class="map ml-md-1"></div>

    <div
      :class="marker.show ? 'map-info--active' : false"
      class="card shadow-sm map-info position-absolute start-50 translate-middle-x top-0"
      style="z-index: 5; margin-top: 100px"
    >
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center">
          <nuxt-link :to="'/app/detail/' + marker.id">
            <h3 class="mb-0 fs-5">{{ marker.title }}</h3>
          </nuxt-link>

          <button class="bg-light rounded rounded-circle p-1 lh-1" @click="hideInfo()">
            <i class="bi bi-x"></i>
          </button>
        </div>

        <p v-if="marker.available">
          To {{ marker.type }}

          <span v-if="marker.type === 'rent' && marker.rent" class="opacity-50">€{{ marker.rent.start }}</span>
        </p>
        <p v-else>Not available</p>
      </div>
      <div class="card-footer">
        <div class="d-flex gap-2 align-items-center">
          <button
            class="bg-light p-2 rounded-circle lh-1 text-white"
            @click="$store.commit('modals/show', { name: 'request', data: marker })"
          >
            <i class="bi bi-chat-text-fill"></i>
          </button>
          <div>{{ marker.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // map: false,
      markers: [],
      marker: { show: false },
    };
  },

  mounted() {
    console.log("map mounted");
    this.initMap();
  },

  beforeDestroy() {
    console.log("map destroy");
    this.$map = undefined;
  },

  props: {
    zoom: {
      type: Number,
      default: 16,
    },
  },

  computed: {},

  methods: {
    hideInfo() {
      this.marker.show = false;
    },
    async initMap() {
      console.log("initmap");
      // copy all ads to markers
      this.markers = [...this.$store.state.data.ads];
      // add owner data (location and name) to markers
      this.markers.forEach(
        (a) => (a["location"] = this.$store.state.data.owners.find((o) => o.id === a.owner).location)
      );
      this.markers.forEach((a) => (a["name"] = this.$store.state.data.owners.find((o) => o.id === a.owner).name));
      this.markers.sort((a, b) => (a.available > b.available ? -1 : 1));

      console.log(this.markers.length);

      //@ts-ignore
      const { Map } = await google.maps.importLibrary("maps");

      let center = this.$store.state.defaultLoc;
      if (this.$store.state.search.place) {
        let place = this.$store.state.search.place;
        center = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
      }

      this.$map = new Map(this.$refs["map"], {
        zoom: this.zoom,
        center: center,
        mapId: "f7886dcdb440711",
        disableDefaultUI: true,
      });

      const iconBase = "https://heather.codesparks.nl/";
      const pins = {
        primary: iconBase + "pin-primary.svg",
        secondary: iconBase + "pin-secondary.svg",
        grey: iconBase + "pin-grey.svg",
      };

      for (let i = 0; i < this.markers.length; i++) {
        let m = this.markers[i];

        const marker = new google.maps.Marker({
          map: this.$map,
          position: m.location,
          title: m.title,
          icon: m.available ? pins.primary : pins.grey,
        });

        google.maps.event.addListener(
          marker,
          "click",
          ((marker) => {
            return () => {
              this.marker = { show: false };

              this.marker["available"] = m.available;
              this.marker["title"] = m.title;
              this.marker["type"] = m.type;
              this.marker["visual"] = m.visuals[0];

              if (m.type === "rent") {
                this.marker["rent"] = m.rent;
              }
              this.marker["name"] = m.name;
              this.marker["id"] = m.id;
              this.marker.show = true;

              this.$map.panTo(marker.getPosition());
            };
          })(marker)
        );
      }

      google.maps.event.addListener(this.$map, "click", function (event) {
        this.marker.show = false;
      });
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
