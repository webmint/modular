const fastify = require('fastify')(
);

fastify.register(require('fastify-cors'), {
  origin: true,
});

// Declare a route
fastify.post('/api/form/moduleb', async (request, reply) => {
  console.log(request.body);
  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send('Submited');
});

fastify.get('/api/pages/:page', async (request, reply) => {
  console.log(request.params);
  let response = {
    blocks: [
    ],
  };
  if (request.params.page === 'some') {
    response = {
      blocks: [
        {
          name: 'ModuleA',
          path: 'moduleA/ModuleA',
          id: 'uniq1',
          region: 1,
        },
        {
          name: 'ModuleB',
          path: 'moduleB/ModuleB',
          id: 'uniq2',
          region: 2,
        },
        {
          name: 'ModuleA',
          path: 'moduleA/ModuleA',
          id: 'uniq3',
          region: 3,
        },
      ],
    };
  }
  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(response);
});
fastify.get('/api/modules/:id', async (request, reply) => {
  let response = {
    text: '',
  };
  if (request.params.id === 'uniq1') {
    response = {
      text: 'Some random text',
    };
  }
  if (request.params.id === 'uniq3') {
    response = {
      text: 'This is third region',
    };
  }
  if (request.params.id === 'uniq2') {
    response = {
      formTitle: 'Test form',
      fields: [
        {
          type: 'text',
          component: 'v-text-field',
          label: 'Username',
          model: 'username',
          validations: [
            {
              type: 'required',
              message: 'This field is required',
              argument: null,
            },
            {
              type: 'minLength',
              message: 'This field has to have min 3 chars',
              argument: 3,
            },
          ],
        },
        {
          type: 'password',
          component: 'v-text-field',
          label: 'Password',
          model: 'password',
          validations: [
            {
              type: 'required',
              message: 'This field is required',
              argument: null,
            },
          ],
        },
      ],
      submitUrl: 'form/moduleb',
      fetchData: false,
      submittable: true,
    };
  }
  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(response);
});
fastify.get('/api/form', async (request, reply) => {
  const response = {
    formTitle: 'Test form',
    formBlocks: [
      {
        component: 'SimpleInputForm',
        blockId: 'u1',
        blockTitle: 'General Info',
        blockModel: 'generalInfo',
        fields: [
          {
            type: 'text',
            component: 'v-text-field',
            label: 'Company name',
            model: 'companyName',
            validations: [
              {
                type: 'required',
                message: 'This field is required',
                argument: null,
              },
            ],
          },
          {
            type: 'text',
            component: 'v-text-field',
            label: 'Questions list',
            model: 'questions',
            validations: [
              {
                type: 'required',
                message: 'This field is required',
                argument: null,
              },
            ],
          },
          {
            type: 'text',
            component: 'v-text-field',
            label: 'Phone Number',
            model: 'phoneNumber',
            validations: [
              {
                type: 'required',
                message: 'This field is required',
                argument: null,
              },
            ],
          },
        ],
      },
      {
        component: 'SimpleInputForm',
        blockId: 'u2',
        blockTitle: 'Address info',
        blockModel: 'addressInfo',
        fields: [
          {
            type: 'text',
            component: 'v-text-field',
            label: 'Address Line 1',
            model: 'genaralInfo',
            validations: [
              {
                type: 'required',
                message: 'This field is required',
                argument: null,
              },
            ],
          },
          {
            type: 'text',
            component: 'v-text-field',
            label: 'Address Line 2',
            model: 'addressLine2',
            validations: [
              {
                type: 'required',
                message: 'This field is required',
                argument: null,
              },
            ],
          },
        ],
      },
      {
        component: 'SimpleInputForm',
        blockId: 'u2',
        blockTitle: 'Address info Second',
        blockModel: 'addressInfo',
        fields: [
          {
            type: 'text',
            component: 'v-text-field',
            label: 'Address Line 1',
            model: 'addressLine1',
            validations: [
              {
                type: 'required',
                message: 'This field is required',
                argument: null,
              },
            ],
          },
          {
            type: 'text',
            component: 'v-text-field',
            label: 'Address Line 2',
            model: 'addressLine2',
            validations: [
              {
                type: 'required',
                message: 'This field is required',
                argument: null,
              },
            ],
          },
        ],
      },
    ],
    submitUrl: 'form/moduleb',
    fetchData: false,
    submittable: true,
  };
  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(response);
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
