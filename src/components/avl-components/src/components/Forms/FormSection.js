import React  from "react"



export const InputContainer = ({classes='col-span-6', label, children}) =>(
  <div className={classes}>
    <label htmlFor="first_name" className="block text-sm font-medium leading-5 text-gray-700">{label}</label>
    {children}
  </div> 
)

export const FormSection = ({title, info, inputs, state, onChange, children}) => (
  <div className="max-w-7xl mx-auto pt-6">
    <div className="bg-white shadow-md px-4 pt-3 pb-5 sm:rounded-sm sm:p-6">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:mt-0 md:col-span-3 border border-red-600">
            <div className="grid grid-cols-6 gap-6">
              {children}
            </div>
        </div>
      </div>
    </div> 
  </div>
)


/*{inputs.map((input,i) => {
                const Input = Inputs[input.type] || Inputs['default']
                return(
                  <InputContainer {...input} key={i}>
                    <Input 
                      onChange={onChange}
                      state={state}
                      {...input} 
                    />
                  </InputContainer>
                )
              })}*/