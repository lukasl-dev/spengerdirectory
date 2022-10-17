import { ObjectClass } from './object-class'

export interface Class {
  dn: string
  objectClass: ObjectClass[]
  cn: string
  description: string
  distinguishedName: string
  instanceType: string
  whenCreated: string
  whenChanged: string
  displayName: string
  uSNCreated: string
  memberOf: string[]
  uSNChanged: string
  proxyAddresses: string[]
  name: string
  objectGUID: string
  objectSid: string
  sAMAccountName: string
  sAMAccountType: string
  showInAddressBook: string[]
  legacyExchangeDN: string
  groupType: string
  objectCategory: string
  dSCorePropagationData: string[]
  mail: string
  internetEncoding: string
  msExchRecipientDisplayType: string
  msExchGroupDepartRestriction: string
  msExchGroupMemberCount: string
  msExchPoliciesIncluded: string[]
  msExchVersion: string
  msExchGroupJoinRestriction: string
  msExchArbitrationMailbox: string
  reportToOriginator: string
  authOrig: string[]
  msExchRequireAuthToSendTo: string
  mailNickname: string
  dLMemSubmitPermsBL: string
  msExchUMDtmfMap: string[]
  dLMemSubmitPerms: string[]
  msExchGroupExternalMemberCount: string
  msExchCoManagedByLink: string
}
