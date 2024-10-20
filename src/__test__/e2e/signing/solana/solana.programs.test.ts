import { Constants } from '../../../..';
import { setupClient } from '../../../utils/setup';
import { dexlabProgram, raydiumProgram } from './__mocks__/programs';

describe('Solana Programs', () => {
  let client;

  test('pair', async () => {
    client = await setupClient();
  });

  it('should sign Dexlab program', async () => {
    const payload = dexlabProgram;
    const signedMessage = await client.sign({
      data: {
        signerPath: [0x80000000 + 44, 0x80000000 + 501, 0x80000000],
        curveType: Constants.SIGNING.CURVES.ED25519,
        hashType: Constants.SIGNING.HASHES.NONE,
        encodingType: Constants.SIGNING.ENCODINGS.SOLANA,
        payload,
      },
    });
    expect(signedMessage).toBeTruthy();
  });

  it('should sign Raydium program', async () => {
    const payload = raydiumProgram;
    const signedMessage = await client.sign({
      data: {
        signerPath: [0x80000000 + 44, 0x80000000 + 501, 0x80000000],
        curveType: Constants.SIGNING.CURVES.ED25519,
        hashType: Constants.SIGNING.HASHES.NONE,
        encodingType: Constants.SIGNING.ENCODINGS.SOLANA,
        payload,
      },
    });
    expect(signedMessage).toBeTruthy();
  });
});
