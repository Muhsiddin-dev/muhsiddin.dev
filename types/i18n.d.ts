import { AbstractIntlMessages } from 'next-intl'

declare global {
  interface IntlMessages extends AbstractIntlMessages {
    nav: {
      home: string
      about: string
      skills: string
      projects: string
      certificates: string
      contact: string
    }
    hero: {
      greeting: string
      downloadCV: string
      viewProjects: string
    }
    about: {
      title: string
      education: string
      educationDesc: string
    }
    skills: {
      title: string
      subtitle: string
    }
    projects: {
      title: string
      subtitle: string
      viewLive: string
      viewCode: string
    }
    certificates: {
      title: string
      subtitle: string
      issuedBy: string
    }
    contact: {
      title: string
      subtitle: string
      email: string
    }
    footer: {
      rights: string
    }
    admin: {
      login: string
      logout: string
      dashboard: string
      password: string
      submit: string
      save: string
      cancel: string
      edit: string
      delete: string
      add: string
      personalInfo: string
      projectsList: string
      certificatesList: string
      uploadImage: string
      uploadPhoto: string
    }
  }
}

export {}
