import React from 'react'
import TeamSignUpForm from '../_components/form/team-form'
import TeamProvider from '../_components/provider/team-provider'

function TeamSignUp() {
  return (
    <TeamProvider>
        <TeamSignUpForm />
    </TeamProvider>
  )
}

export default TeamSignUp