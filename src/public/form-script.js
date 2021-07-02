const formKeysMap = {
  name: 'NOME',
  crm: 'CRM',
  phone: 'TELEFOE',
  mobile_phone: 'CELULAR',
  cep: 'CEP',
  skills: 'ESPECIALIDADES',
};

Vue.component('vue-multiselect', window.VueMultiselect.default);
const vue = new Vue({
  el: '#vue-form',
  template: `
    <div class="flex flex-col justify-center">
      <p>
        <label for="nome">Nome:</label><br>
        <input class="border border-gray-300 p-2 rounded w-72 mt-1" id="nome" v-model="formBody.name">
      </p>
      <p>
        <label for="crm">CRM:</label><br>
        <input class="border border-gray-300 p-2 rounded w-72 mt-1" id="crm" v-model.number="formBody.crm" maxLength="7" minLength="7">
      </p>
      <p>
        <label for="phone">Telefone:</label><br>
        <input class="border border-gray-300 p-2 rounded w-72 mt-1" id="phone" v-model="formBody.phone">
      </p>
      <p>
        <label for="mobile_phone">Celular:</label><br>
        <input class="border border-gray-300 p-2 rounded w-72 mt-1" id="mobile_phone" v-model="formBody.mobile_phone">
      </p>
      <p>
        <label for="cep">CEP:</label><br>
        <input class="border border-gray-300 p-2 rounded w-72 mt-1" id="cep" v-model.number="formBody.cep">
      </p>

      <p>
        <label for="skills">Especialidades:</label><br>
        <div class="w-96 mx-auto mt-1">
          <vue-multiselect v-model="formBody.skills" :multiple="true" :options="skillsData" :taggable="true" @tag="addSkill">
            <template slot="tag" slot-scope="props">
              <p class="p-1 bg-green-700 text-white w-auto rounded m-1">
                {{props.option.name}}
              </p>
            </template>
            <template slot="option" slot-scope="props">{{props.option.name}}</template>
          </vue-multiselect>
        </div>
      </p>

      <div v-if="formErrors.length && showErrors">
        <div v-for="(error, i) in formErrors" :key="i" class="text-red-500 font-bold text-lg">
          {{ error }}
        </div>
      </div>

      <button class="px-4 py-2 rounded-md bg-green-500 text-white font-bold mt-4" @click="handleSubmit">CADASTRAR</button>
    </div>
  `,
  data: () => ({
    skillsData,
    showErrors: false,
    requestError: false,
    formBody: {
      name: '',
      crm: '',
      phone: '',
      mobile_phone: '',
      cep: '',
      skills: [],
    },
  }),
  computed: {
    formErrors() {
      const errors = [];

      if (Object.values(this.formBody).some((x) => !x.length)) {
        Object.entries(this.formBody)
          .filter(([k, v]) =>
            typeof v === 'number' ? !v.toString().length : !v.length,
          )
          .forEach(([k, v]) => {
            errors.push(`O campo ${formKeysMap[k]} está vazio.`);
          });
      }

      if (this.formBody.name.length >= 120) {
        errors.push('O campo NOME deve ter até 120 caracteres.');
      }
      if (this.formBody.crm.toString().length > 7) {
        errors.push('O campo CRM deve ter até 7 digitos.');
      }
      if (this.formBody.skills.length < 2) {
        errors.push('São necessárias no mínimo duas especialidades.');
      }
      if (this.requestError) {
        errors.push('Ocorreu um erro ao cadastrar o médico!');
      }

      return errors;
    },
  },
  methods: {
    testCep(cep) {
      const validacep = /^[0-9]{8}$/;
      return validacep.test(cep);
    },
    addSkill(name) {
      this.formBody.skills.push({ name });
      this.skillsData.push({ name });
    },
    handleSubmit() {
      if (!this.formErrors.length) {
        fetch(`${BASE_URL}/doctors`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.formBody),
        })
          .then((response) => {
            response.json().then((data) => {
              console.log(data);
            });
          })
          .catch(() => {
            this.requestError = true;
          });
      } else {
        this.showErrors = true;
      }
    },
  },
});
