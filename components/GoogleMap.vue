<template>
  <div class="map-container">
    <div id="map" ref="map" class="map ml-md-2">
      <div v-if="error" class="text-center mt-5 pt-5">
        <p>{{ error }}</p>
      </div>
    </div>

    <marker-info :markerInfo="markerInfo" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      markerInfo: { show: false },
      gmapmarkers: [],
      error: undefined,
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

          this.setMarkers(n);
        }
      },
    },
  },

  computed: {},

  methods: {
    getCenter() {
      if (this.$store.state.search.place) {
        let place = this.$store.state.search.place;
        if (place.geometry) {
          return { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
        } else if (this.$store.state.user.location) {
          return { lat: this.$store.state.user.location.lat, lng: this.$store.state.user.location.lng };
        }
      }
      return this.$store.state.origin;
    },

    async initMap() {
      if (!google) {
        this.error = "Google map didn't load correctly, please reload page.";
        return;
      }

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

    setMarkers(data) {
      if (data.length > 0) {
        if ("id" in data[0]) {
          // user data provided
          this.setUserMarkers(data);
        } else {
          // item data
          this.setCallMarkers(data.filter((i) => i.type === "call"));
          this.setAdMarkers(data.filter((i) => i.type !== "call"));
        }
      }
    },

    setUserMarkers(markers) {
      for (let i = 0; i < markers.length; i++) {
        let m = markers[i];

        const marker = new google.maps.Marker({
          map: this.$map,
          position: m.location,
          title: m.title,
          icon: "https://heather.codesparks.nl/pin-primary.svg",
        });

        this.gmapmarkers.push(marker);

        google.maps.event.addListener(
          marker,
          "click",
          ((marker) => {
            return () => {
              this.setUserMarkerInfo(m); // sets data in info box
              // this.$map.panTo(marker.getPosition());
            };
          })(marker)
        );
      }
    },

    setCallMarkers(markers) {
      for (let i = 0; i < markers.length; i++) {
        let m = markers[i];

        const marker = new google.maps.Marker({
          map: this.$map,
          position: m.location,
          title: m.title,
          icon: "https://heather.codesparks.nl/pin-secondary.svg",
        });

        this.gmapmarkers.push(marker);

        google.maps.event.addListener(
          marker,
          "click",
          ((marker) => {
            return () => {
              this.setCallMarkerInfo(m); // sets data in info box
              // this.$map.panTo(marker.getPosition());
            };
          })(marker)
        );
      }
    },

    setAdMarkers(markers) {
      const iconBase = "https://heather.codesparks.nl/";
      const pins = {
        primary: iconBase + "pin-primary.svg",
        secondary: iconBase + "pin-secondary.svg",
        grey: iconBase + "pin-grey.svg",
      };

      for (let i = 0; i < markers.length; i++) {
        let m = markers[i];

        const marker = new google.maps.Marker({
          map: this.$map,
          position: m.location,
          title: m.title,
          icon: pins.primary,
        });

        this.gmapmarkers.push(marker);

        google.maps.event.addListener(
          marker,
          "click",
          ((marker) => {
            return () => {
              this.setAdMarkerInfo(m); // sets data in info box
              // this.$map.panTo(marker.getPosition());
            };
          })(marker)
        );
      }
    },

    setAdMarkerInfo(m) {
      // sets data in info box
      this.markerInfo = { show: false };
      this.markerInfo["title"] = m.title;
      this.markerInfo["type"] = m.type;
      if (m.type === "rent") {
        this.markerInfo["rent"] = m.rent;
      }
      this.markerInfo["name"] = m.name;
      this.markerInfo["id"] = m.id;
      this.markerInfo.show = true;
    },

    setCallMarkerInfo(m) {
      // sets data in info box
      this.markerInfo = { show: false };
      this.markerInfo["title"] = m.title;
      this.markerInfo["name"] = m.name;
      this.markerInfo["type"] = "call";
      this.markerInfo["description"] = m.description;
      this.markerInfo["id"] = m.id;
      this.markerInfo.show = true;
    },

    setUserMarkerInfo(m) {
      // this.markerInfo = m;
      // this.markerInfo["show"] = true;
      // return;
      // sets data in info box
      this.markerInfo = { show: false };
      this.markerInfo["type"] = "user";
      this.markerInfo["name"] = m.name;
      this.markerInfo["numItems"] = m.numItems;
      this.markerInfo["id"] = m.id;
      this.markerInfo.show = true;
    },
  },
};
</script>

<style lang="scss" scoped>
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
}
</style>
