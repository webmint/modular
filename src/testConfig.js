export default {
  title: 'Test form',
  blocks: [
    {
      component: 'SimpleInputForm',
      id: 'u1',
      title: 'General Info',
      model: 'generalInfo',
      conditions: [],
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
          conditions: [],
        },
        {
          type: 'text',
          component: 'v-text-field',
          label: 'Questions list',
          model: 'questions',
          validations: [
            {
              type: 'minLength',
              message: 'This field must be 5 chars long',
              argument: 5,
            },
          ],
        },
        {
          type: 'number',
          component: 'v-text-field',
          label: 'Age',
          model: 'age',
          validations: [
            {
              type: 'required',
              message: 'This field is required',
              argument: null,
            },
            {
              type: 'between',
              message: 'This field is must be between 18 and 35',
              argument: [18, 35],
            },
          ],
        },
        // {
        //   type: 'text',
        //   component: 'v-text-field',
        //   label: 'Phone Number',
        //   model: 'phoneNumber',
        //   validations: [
        //     {
        //       type: 'required',
        //       message: 'This field is required',
        //       argument: null,
        //     },
        //   ],
        // },
      ],
    },
    // {
    //   component: 'SimpleInputForm',
    //   id: 'u2',
    //   title: 'Address',
    //   model: 'address',
    //   conditions: [],
    //   fields: [
    //     {
    //       type: 'text',
    //       component: 'v-text-field',
    //       label: 'Address Line 1',
    //       model: 'addressLine1',
    //       validations: [
    //         {
    //           type: 'required',
    //           message: 'This field is required',
    //           argument: null,
    //         },
    //       ],
    //     },
    //     {
    //       type: 'text',
    //       component: 'v-text-field',
    //       label: 'Address Line 2',
    //       model: 'addressLine2',
    //       validations: [
    //       ],
    //     },
    //   ],
    // },
  ],
  submitUrl: 'form/moduleb',
  fetchData: false,
  submittable: true,
};
