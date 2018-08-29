const test = require('tape')
const hash = require('./hashing')

test('sdk', t => {
  t.plan(1)
  t.ok(true)

  /*
	hs := New()
	_, ok := hs.(hash.Hash)
	if !ok {
		t.Errorf("expected to be instance of hash.Hash")

			[]byte("hello world"),
			"0x0ac561fac838104e3f2e4ad107b4bee3e938bf15f2b15f009ccccd61a913f017",
		},
	}

	for i, tt := range tests {
		t.Run(fmt.Sprintf("%v", i), func(t *testing.T) {
			hashBytes := Hash(tt.in)
			hexed := hexutil.EncodeToString(hashBytes[:])

		{
			[]byte("hello world"),
			"0x0ac561fac838104e3f2e4ad107b4bee3e938bf15f2b15f009ccccd61a913f017",
		},
	}

	for i, tt := range tests {
		t.Run(fmt.Sprintf("%v", i), func(t *testing.T) {
			hs := HashToHexString(tt.in)

	tests := []struct {
		in struct {
			arg1 string
			arg2 []byte
		}
		out bool
	}{
		{
			struct {
				arg1 string
				arg2 []byte
			}{
				"0x1234",
				[]byte("foo"),
			},
			false,
		},
		{
			struct {
				arg1 string
				arg2 []byte
			}{
				"0x0ac561fac838104e3f2e4ad107b4bee3e938bf15f2b15f009ccccd61a913f017",
				[]byte("hello world"),
			},
			true,
		},
	}

	for i, tt := range tests {
		t.Run(fmt.Sprintf("%v", i), func(t *testing.T) {
			result := IsEqual(tt.in.arg1, tt.in.arg2)
			if result != tt.out {
  */
})
