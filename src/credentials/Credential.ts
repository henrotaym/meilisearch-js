import ApiRequest from "../Request";

/** Representing a client credential. */
abstract class Credential {
  /** Preparing given request. */
  abstract prepare(request: ApiRequest): void;
}

export default Credential;
