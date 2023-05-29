<template>
  <div class="map-container">
    <div id="map" ref="map" class="map"></div>

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

        <p v-if="marker.available">To {{ marker.type }}</p>
        <p v-else>Not available</p>
      </div>
      <div class="card-footer">
        <div class="d-flex gap-2 align-items-center">
          <button class="bg-light p-2 rounded-circle lh-1"><i class="bi bi-chat-text-fill"></i></button>
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
      map: false,
      markers: [],
      content: "bdfdfdflb",
      marker: { show: false },
    };
  },

  mounted() {
    this.initMap();

    // copy all ads to markers
    this.markers = [...this.$store.state.data.ads];
    // add owner data (position and name) to markers
    this.markers.forEach((a) => (a["position"] = this.$store.state.data.owners.find((o) => o.id === a.owner).position));
    this.markers.forEach((a) => (a["name"] = this.$store.state.data.owners.find((o) => o.id === a.owner).name));

    console.log(this.markers);
    console.log(this.markers.length);
  },

  computed: {},

  methods: {
    hideInfo() {
      let info = this.$refs["info"];
      info.style.display = "none";
    },
    async initMap() {
      // The location of Leiden
      const position = { lat: 52.16869, lng: 4.47094 };
      //@ts-ignore
      const { Map } = await google.maps.importLibrary("maps");
      // const infowindow = new google.maps.InfoWindow();

      this.map = new Map(this.$refs["map"], {
        zoom: 16,
        center: { lat: 52.16869, lng: 4.47094 }, // to do
        mapId: "f7886dcdb440711",
        disableDefaultUI: true,
      });

      const iconBase = "https://heather.codesparks.nl/";
      const pins = {
        primary: iconBase + "pin-primary.png",
        secondary: iconBase + "pin-secondary.png",
        grey: iconBase + "pin-grey.png",
      };

      for (let i = 0; i < this.markers.length; i++) {
        let m = this.markers[i];

        const marker = new google.maps.Marker({
          map: this.map,
          position: m.position,
          title: m.title,
          icon: m.available ? pins.primary : m.grey,
        });

        google.maps.event.addListener(
          marker,
          "click",
          ((marker) => {
            return () => {
              console.log("clicked!!!");
              this.marker = { show: false };

              this.marker["available"] = m.available;
              this.marker["title"] = m.title;
              this.marker["type"] = m.type;
              this.marker["name"] = m.name;
              this.marker["id"] = m.id;
              this.marker.show = true;

              this.map.panTo(marker.getPosition());
              // infowindow.setContent(contentString);
              // infowindow.open(this.map, marker);
            };
          })(marker)
        );
      }

      google.maps.event.addListener(this.map, "click", function (event) {
        // infowindow.close();
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

  @include media-breakpoint-up(md) {
    margin-left: 1.6rem;
  }

  &-info {
    // display: none;
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
