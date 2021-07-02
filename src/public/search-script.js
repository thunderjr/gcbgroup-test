new Vue({
  el: '#vue-search',
  template: `
    <div class="flex flex-col justify-center mt-4">
      <!-- search -->
      <input class="p-2 border border-gray-300 my-2" placeholder="Insira o termo para busca..." v-model="query" />
      <div class="flex flex-row items-center justify-center space-x-4">
        <p><input type="radio" class="mr-2" id="name" value="name" v-model="searchField"><label for="name">NOME</label></p>
        <p><input type="radio" class="mr-2" id="crm" value="crm" v-model="searchField"><label for="crm">CRM</label></p>
        <p><input type="radio" class="mr-2" id="phone" value="phone" v-model="searchField"><label for="phone">TELEFONE</label></p>
        <p><input type="radio" class="mr-2" id="mobile_phone" value="mobile_phone" v-model="searchField"><label for="mobile_phone">CELULAR</label></p>
        <p><input type="radio" class="mr-2" id="address.street" value="address.street" v-model="searchField"><label for="address.street">ENDEREÇO</label></p>
        <p><input type="radio" class="mr-2" id="address.district" value="address.district" v-model="searchField"><label for="address.district">BAIRRO</label></p>
        <p><input type="radio" class="mr-2" id="address.city" value="address.city" v-model="searchField"><label for="address.city">CIDADE</label></p>
      </div>
    
      <div class="flex flex-wrap flex-row justify-center mt-4">
        <div class="text-left flex flex-col p-6 m-2 border rounded shadow space-4" v-for="doc in doctorsData">
          <!-- fields -->
          <div class="flex flex-row flex-1 space-x-12 mb-5">
            <div class="flex flex-col">
              <div>
                <b>Nome:</b>
                <div>{{doc.name}}</div>
              </div>
              <div>
                <b>CRM:</b>
                <div>{{doc.crm}}</div>
              </div>
              <div>
                <b>Telefone:</b>
                <div>{{doc.phone}}</div>
              </div>
              <div>
                <b>Celular:</b>
                <div>{{doc.mobile_phone}}</div>
              </div>
              <div>
                <b>Especialidades:</b>
                <div class="text-sm" v-for="skill in doc.skills">{{skill.name}}</div>
              </div>
            </div>
            <div>
              <div>
                <b>CEP:</b>
                <div>{{doc.address.cep}}</div>
              </div>
              <div>
                <b>Endereço:</b>
                <div>{{doc.address.street}}</div>
              </div>
              <div>
                <b>Bairro:</b>
                <div>{{doc.address.district}}</div>
              </div>
              <div>
                <b>Cidade/Estado:</b>
                <div>{{doc.address.city}} - {{doc.address.state}}</div>
              </div>
            </div>
          </div>

          <!-- buttons -->
          <div class="flex flex-row justify-center">
            <button class="px-4 py-2 rounded-md bg-red-500 text-white font-bold" onClick="deleteDoctor(doc.id)">EXCLUIR</button>
          </div>
        </div>
      </div>
    </div>
  `,
  data: () => ({
    doctorsData,
    searchField: 'name',
    query: '',
  }),
  computed: {
    queryString() {
      return `?key=${this.searchField}&q=${this.query}`;
    },
  },
  methods: {
    async handleSearch() {
      const response = await fetch(
        `${BASE_URL}/doctors/search/${this.queryString}`,
      );
      this.doctorsData = await response.json();
    },
  },
  watch: {
    searchField: function () {
      this.handleSearch();
    },
    query: function () {
      this.handleSearch();
    },
  },
});
