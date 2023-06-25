<template>
  <main>
    <hero />

    <section id="about">
      <div class="container-xl">
        <div class="row justify-content-center text-center" data-aos="fade-up-scale">
          <div class="col-12 col-md-8">
            <h2 class="lh-sm">
              Heather is the first fully decentralized peer-to-peer sharing platform for sharing items within local communities.
            </h2>
          </div>
          <div class="col-12 col-md-10 fs-md">
            <p>
              Neighbors can ask a deposit when lending an item. The deposits are stored safely on the Hedera network and are returned
              automatically when the item is returned to its owner. We also encourage reviewing and we make sure the reviews are reliable by
              storing them on the Hedera network.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section id="roadmap">
      <div class="container-xl">
        <div class="row gy-4">
          <div class="d-none d-md-block col-md-4">
            <div data-aos="fade-up-scale" class="h-100">
              <sticky>
                <div>
                  <badge> Roadmap </badge>

                  <roadmap />
                </div>
              </sticky>
            </div>
          </div>

          <div class="col-12 col-md-8">
            <div data-aos="fade-up-scale">
              <badge>Hello Future</badge>

              <h2>On the road to sustainable neighborhoods</h2>

              <div class="fs-md">
                <p>
                  We believe that transparency is key to building a successful business. That's why we're excited to share with you our
                  vision for the future, and the steps we're taking to get there.
                </p>

                <p>
                  The roadmap below shows the key milestones and initiatives as we work to bring our product to market. So, whether you're
                  an investor, a neighbor, or just someone who's interested in what we're doing, we invite you to join us on this journey.
                </p>
              </div>

              <p>
                <nuxt-link :to="{ hash: '#contact' }" class="fw-bold text-primary"
                  >Contact us to join our mission<i class="ps-1 bi bi-arrow-right"></i
                ></nuxt-link>
              </p>
            </div>

            <div class="row gy-2 mt-2 border-top" id="v01" data-aos="fade-up-scale">
              <span class="font-sm fw-light">26 May — 2 June</span>

              <div class="col-12 col-lg-6">
                <h4>Market research</h4>

                <p>
                  What motivates people to share items? And how do they feel about deposits? I conduced a small
                  <a href="/pilot-survey.pdf" class="border-bottom">pilot study</a> (in Dutch) and readjusted my design decisions
                  accordingly. Due to time constraints, I only collected a small amount of responses. I'm planning to launch a bigger study
                  in a later stage.
                </p>
              </div>

              <div class="col-12 col-lg-6">
                <h4>Design and development</h4>

                <p>
                  I designed and developed the majority of the dApp, including the homepage, the app page and the search functionality. I
                  mainly used bootstrap with SCSS, Vue and Nuxt.
                </p>
              </div>

              <div class="col-12 col-lg-6">
                <h4>Locations and distances</h4>

                <p>
                  I integrated a map using the Google Maps Javascript API to make it easier for users to find items in their own
                  neighborhood. I also used the
                  <a href="https://developers.google.com/maps/documentation/javascript/geometry">Google's Geometry Library</a> for computing
                  distances between users.
                </p>
              </div>
            </div>
            <div data-aos="fade-up-scale">
              <div class="row gy-2 mt-2 border-top" id="v03">
                <span class="font-sm fw-light">2 June — 9 June</span>

                <div class="col-12 col-lg-6">
                  <h4>Decentralized database</h4>

                  <p>
                    I developed a decentralized storage solution for the data on the Hedera testnet. While this has some obvious
                    disadvantages in terms of speed, it also eliminated the need for back-end development whilst also providing the
                    opportunity to get more experience with writing smart contracts on Hedera. In a later stage I will switch to a more
                    scalable, and possibly centralized, approach.
                  </p>
                </div>
                <div class="col-12 col-lg-6">
                  <h4>Dummy dataset</h4>

                  <p>
                    I created a dataset with dummy data, using items from my own and my families' household. Addionally, I created a set of
                    dummy user accounts including a wallet for each dummy user on the Hedera testnet.
                  </p>
                </div>
              </div>
            </div>
            <div data-aos="fade-up-scale">
              <div class="row gy-2 mt-2 border-top" id="v04">
                <span class="font-sm fw-light">9 June — 19 June</span>

                <div class="col-12 col-lg-6">
                  <h4>Borrow contract</h4>

                  <p>
                    I wrote
                    <a
                      href="https://github.com/louweal/heather/blob/master/utils/contracts/Borrow.sol"
                      target="_blank"
                      class="border-bottom"
                      >Smart Contract</a
                    >
                    in Solidity and interacted with it using the Hedera Javascript SDK. The contract handles everything related to borrowing
                    and renting items. From sending borrow requests to storing deposits, to handling problems and writing reviews.
                  </p>
                </div>

                <div class="col-12 col-lg-6">
                  <h4>HashPack integration</h4>

                  <p>
                    I integrated <a href="https://www.hashpack.app/" target="_blank" class="border-bottom">Hashpack</a> to make it possible
                    to connect Hedera wallets to the dApp.
                  </p>
                </div>
              </div>
            </div>

            <div class="row gy-2 mt-2 border-top" id="v05" data-aos="fade-up-scale">
              <span class="font-sm fw-light">19 June — 26 June</span>

              <p>
                Although I spend most of this week on a holiday in nature with my boyfriend and our dog 🐕🌳, I also managed to finish some
                crucial deliverables!
              </p>

              <div class="col-12 col-lg-6">
                <h4>Testing</h4>

                <p>
                  My boyfriend tested the whole application and I changed and fixed a lot stuff based on his feedback. Unfortunately, I was
                  unable to solve all issues before the deadline. Remaining issues will be fixed after the judging phase.
                </p>
              </div>

              <div class="col-12 col-lg-6">
                <h4>Pitch video</h4>

                <p>
                  I created a 5-minute
                  <a href="https://www.youtube.com/watch?v=DnDVVyjth98" target="_blank" class="border-bottom">pitch video</a> showcasing the
                  vision, goals and mission of Heather a demo of almost all functionalities and the future milestones.
                </p>
              </div>
              <div class="col-12 col-lg-6">
                <h4>Project description</h4>

                <p>
                  I wrote a short <nuxt-link to="/project-description" class="border-bottom">project description</nuxt-link>, containing a
                  summary of the project, a problem statement and how I used Hedera to solve this problem.
                </p>
              </div>

              <div class="col-12 col-lg-6">
                <h4>README</h4>

                <p>
                  I also created a 'read me'-file containing information about navigating the repository, how to run the code and some
                  helpful tips for testing.
                </p>
              </div>
            </div>

            <div class="row gy-2 mt-2 border-top" id="v06" data-aos="fade-up-scale">
              <span class="font-sm fw-light">Judging phase</span>

              <p>During the judging phase I will further solidify my ideas and the steps needed to bring Heather to the market.</p>
            </div>

            <div class="row gy-2 mt-2 border-top" id="v07" data-aos="fade-up-scale">
              <span class="font-sm fw-light">8 July — the future</span>

              <div class="col-12 col-lg-6">
                <h4>Further market research</h4>

                <p>
                  I want to conduct more market research studies to better understand what the market wants and also to collect feedback
                  about the current version of the app.
                </p>
              </div>

              <div class="col-12 col-lg-6">
                <h4>Multilanguage support</h4>

                <p>
                  I want to convert Heather to a multi-language website, such that I can also create a Dutch version and launch the first
                  versions of the app in my own neighborhood, which makes it easier to collect feedback.
                </p>
              </div>

              <div class="col-12 col-lg-6">
                <h4>Email services</h4>

                <p>
                  Users need to a notifications whenever someone wants to rent or borrow one of their items and whenever the state of a item
                  changes. I want to integrate an email service to support email notifications.
                </p>
              </div>

              <div class="col-12 col-lg-6">
                <h4>Switch back-end</h4>

                <p>
                  The current decentralized solution for storing data is too slow and not scalable. Therefore I need to develop a different
                  back-end that is faster, easier to interact with and that can handle larger datasets.
                </p>
              </div>

              <div class="col-12 col-lg-6">
                <h4>Integrate with existing solutions</h4>

                <p>
                  People who do not have a Hedera wallet should also be able to use Heather. Therefore, I want to integrate an onRamping
                  service like C14 or Fractal.ID. I also want to look into other interesting existing solutions such as Arkhia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="contact">
      <div class="container-xl">
        <div class="py-4 px-2 text-center text-white bg-primary rounded">
          <div class="row justify-content-center" data-aos="fade">
            <div class="col-12 col-md-10">
              <h3 class="text-white">Let's connect</h3>

              <p>We're excited to connect with you. Got a question, need some help, or just want to say hi? Drop us a message!</p>

              <div class="d-flex justify-content-center">
                <nuxt-link to="/contact" class="btn btn-light"> <i class="bi bi-envelope me-2"></i> Send message </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script></script>
<style></style>
