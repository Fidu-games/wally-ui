import React from 'react'

export default function UpdateForm (props) {
  return (
    <div id='updateForm'>
      <div>
        <div>{props.error}</div>
        <form onSubmit={props.onSubmit}>
          <div className='form-group mt-5'>
            <label htmlFor='name'>Nombre completo</label>
            <input
              type='text'
              name='name'
              id='name'
              className='form-control'
              placeholder='Introduce tu nombre completo'
              maxLength='100'
              value={props.prevForm.name}
              onChange={props.onChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='nickname'>Nickname</label>
            <input
              type='text'
              name='nickname'
              id='nickname'
              className='form-control'
              placeholder='Introduce un nombre loco'
              maxLength='15'
              value={props.prevForm.nickname}
              onChange={props.onChange}
              required
            />
          </div>
          <button className='btn btn-primary'>actualizar</button>
        </form>
        <button className='btn btn-primary' onClick={props.onChangeView}>regresar</button>
      </div>
    </div>
  )
}